import { prismaClient } from '@mec/web/prismaClient'
import { Scope } from '@mec/web/scope'

export const getProjectsList = (scope: Scope) =>
  prismaClient.project.findMany({
    where:
      scope.scale === 'municipality'
        ? { municipalityCode: scope.code }
        : scope.scale === 'intercommunality'
        ? // We get all projects done by interco OR a municipality inside this interco
          {
            OR: [
              { intercommunalityCode: scope.code },
              {
                municipality: {
                  intercommunalityCode: scope.code,
                },
              },
            ],
          }
        : scope.scale === 'district'
        ? {
            // Municipality is in district
            municipality: { districtCode: scope.code },
          }
        : // 'county'
          {
            // Municipality is in county
            municipality: { district: { countyCode: scope.code } },
          },
    include: {
      attachments: true,
      municipality: {
        include: {
          district: { include: { county: { include: { region: true } } } },
          intercommunality: { include: { crte: true } },
        },
      },
      intercommunality: { include: { crte: true } },
      category: { include: { theme: true } },
      secondaryCategories: { include: { theme: true } },
      notes: {
        where: { [`${scope.scale}Code`]: scope.code },
      },
    },
    orderBy: [
      { intercommunality: { name: 'asc' } },
      { municipality: { name: 'asc' } },
      { created: 'desc' },
    ],
  })

type CrteProjects = {
  crte: { code: string; name: string }
  projects: ProjectsList
}
export const groupProjectsByCrte = (projects: ProjectsList): CrteProjects[] => {
  const result = new Map<string, CrteProjects>()

  projects.forEach((project) => {
    const crte =
      project.municipality?.intercommunality?.crte ??
      project.intercommunality?.crte
    if (!crte) {
      // This should not happen due to data validation, ignore this edge case, error must have been thrown elsewhere
      return
    }
    const existing = result.get(crte.code)
    if (existing) {
      existing.projects.push(project)
      return
    }
    result.set(crte.code, { crte, projects: [project] })
  })

  return [...result.values()]
}

type MunicipalityProjects = {
  municipality: { code: string; name: string }
  projects: ProjectsList
}
export const groupProjectsByMunicipality = (
  projects: ProjectsList,
): MunicipalityProjects[] => {
  const result = new Map<string, MunicipalityProjects>()

  projects.forEach((project) => {
    const municipality = project.municipality
    if (!municipality) {
      // This should not happen due to data validation, ignore this edge case, error must have been thrown elsewhere
      return
    }
    const existing = result.get(municipality.code)
    if (existing) {
      existing.projects.push(project)
      return
    }
    result.set(municipality.code, { municipality, projects: [project] })
  })

  return [...result.values()]
}

type IntercommunalityProjects = {
  intercommunality: { code: string; name: string }
  // Projects done directly by this intercommunality
  projects: ProjectsList
  municipalities: MunicipalityProjects[]
}
export const groupProjectsByIntercommunality = (
  projects: ProjectsList,
): IntercommunalityProjects[] => {
  const result = new Map<string, IntercommunalityProjects>()

  projects.forEach((project) => {
    const intercommunality =
      project.intercommunality ?? project.municipality?.intercommunality
    if (!intercommunality) {
      // This should not happen due to data validation, ignore this edge case, error must have been thrown elsewhere
      return
    }
    const existing = result.get(intercommunality.code)
    if (existing) {
      existing.projects.push(project)
      return
    }
    result.set(intercommunality.code, {
      intercommunality,
      projects: [project],
      municipalities: [],
    })
  })

  return [...result.values()].map(({ projects, intercommunality }) => {
    // Projects directly done by interco
    const intercommunalityProjects: ProjectsList = []
    // Projects done by municipalities in interco
    const municipalitiesProjects: ProjectsList = []
    projects.forEach((project) => {
      if (project.intercommunality) {
        intercommunalityProjects.push(project)
        return
      }
      municipalitiesProjects.push(project)
    })
    const municipalities = groupProjectsByMunicipality(municipalitiesProjects)
    return {
      intercommunality,
      projects: intercommunalityProjects,
      municipalities,
    }
  })
}

export type ProjectsList = Awaited<ReturnType<typeof getProjectsList>>

export type ProjectListItem = ProjectsList[number]
