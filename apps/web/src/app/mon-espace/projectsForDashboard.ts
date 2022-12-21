import { prismaClient } from '@mec/web/prismaClient'
import { DashboardScope } from '@mec/web/app/mon-espace/dashboard'

export const getProjectsForDashboard = (scope: DashboardScope) =>
  prismaClient.project.findMany({
    where:
      'municipality' in scope
        ? { municipalityCode: scope.municipality.code }
        : 'intercommunality' in scope
        ? // We get all projects done by interco OR a municipality inside this interco
          {
            OR: [
              { intercommunalityCode: scope.intercommunality.code },
              {
                municipality: {
                  intercommunalityCode: scope.intercommunality.code,
                },
              },
            ],
          }
        : 'district' in scope
        ? {
            // Municipality is in district
            municipality: { districtCode: scope.district.code },
          }
        : // 'county' in scope
          {
            // Municipality is in county
            municipality: { district: { countyCode: scope.county.code } },
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
        where:
          'municipality' in scope
            ? { municipalityCode: scope.municipality.code }
            : 'intercommunality' in scope
            ? { intercommunalityCode: scope.intercommunality.code }
            : 'district' in scope
            ? {
                // Municipality is in district
                districtCode: scope.district.code,
              }
            : // 'county' in scope
              {
                countyCode: scope.county.code,
              },
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
  projects: ProjectsForDashboard
}
export const groupProjectsByCrte = (
  projects: ProjectsForDashboard,
): CrteProjects[] => {
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
  projects: ProjectsForDashboard
}
export const groupProjectsByMunicipality = (
  projects: ProjectsForDashboard,
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
  projects: ProjectsForDashboard
  municipalities: MunicipalityProjects[]
}
export const groupProjectsByIntercommunality = (
  projects: ProjectsForDashboard,
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
    const intercommunalityProjects: ProjectsForDashboard = []
    // Projects done by municipalities in interco
    const municipalitiesProjects: ProjectsForDashboard = []
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

export type ProjectsForDashboard = Awaited<
  ReturnType<typeof getProjectsForDashboard>
>

export type ProjectForDashboard = ProjectsForDashboard[number]
