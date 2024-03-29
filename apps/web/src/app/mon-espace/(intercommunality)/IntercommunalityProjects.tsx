import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { NoProjects } from '@mec/web/app/mon-espace/(intercommunality)/NoProjects'
import Link from 'next/link'
import { asyncComponent } from '@mec/web/utils/asyncComponent'
import { WriteProjectsTable } from '@mec/web/app/mon-espace/ProjectsTable/WriteProjectsTable'
import { Crte, Intercommunality } from '@prisma/client'
import { ReadProjectsTable } from '@mec/web/app/mon-espace/ProjectsTable/ReadProjectsTable'
import { Routes } from '@mec/web/app/routing'
import { Scope } from '@mec/web/scope'
import {
  getProjectsList,
  ProjectsList,
} from '@mec/web/app/mon-espace/projets/projectsList'
import { ProjectsTableContainer } from '@mec/web/app/mon-espace/projets/[scale]/[code]/ProjectsTableContainer'

export const IntercommunalityProjects = asyncComponent(
  async ({
    intercommunality,
    crte,
  }: {
    intercommunality: Intercommunality
    crte: Crte
  }) => {
    // A intercommunality dashboard assumes write access on X (generally one) intercomunalities
    // And Read access on All municipalities in this intercommunality
    // General case is 1 municipality and 1 CRTE but for data modeling ease, we iterate on array structure

    const scope = {
      scale: 'intercommunality',
      code: intercommunality.code,
    } satisfies Scope

    const projects = await getProjectsList(scope)

    if (projects.length === 0) {
      return (
        <div className="fr-container">
          <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
          <NoProjects canAdd scope={scope} />
        </div>
      )
    }

    // We display a table of projects done by this intercommunality, and another read only for municipalities of this crte
    const intercommunalityProjects: ProjectsList = []
    const municipalitiesProjects: ProjectsList = []
    projects.forEach((project) => {
      if (!!project.intercommunalityCode) {
        intercommunalityProjects.push(project)
        return
      }
      municipalitiesProjects.push(project)
    })

    return (
      <>
        <div className="fr-container">
          <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
        </div>

        <div key={crte.code + '-head'} className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <h2 style={{ color: 'var(--blue-france-sun-113-625)' }}>
                Projets {crte.name}
              </h2>
            </div>
          </div>
        </div>

        <div
          key={intercommunality.code + '-head'}
          className="fr-container fr-mt-4v"
        >
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-9 ">
              <h3 className="fr-mb-4v">{intercommunality.name}</h3>
              <p>
                Vous pouvez modifier les différentes informations de vos projets
                en cliquant directement dans le tableau.
              </p>
            </div>
            <div className="fr-col-12 fr-col-md-3 fr-col--middle">
              <div className="fr-btns-group fr-btns-group--icon-left">
                <Link
                  className="fr-btn fr-icon-add-line"
                  href={Routes.MonEspace.Projet.NouveauWithParams(scope)}
                >
                  Ajouter un nouveau projet
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ProjectsTableContainer key={intercommunality.code + '-table'}>
          <WriteProjectsTable
            projects={intercommunalityProjects}
            scope={scope}
          />
        </ProjectsTableContainer>
        <div
          key={intercommunality.code + '-municipalities-head'}
          className="fr-container fr-mt-4v"
        >
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-col-12">
              <h3 className="fr-mb-4v">
                Municipalités - {intercommunality.name}
              </h3>
              <p>
                Retrouvez dans ce tableau les projets renseignés par les
                municipalités de votre EPCI.
              </p>
            </div>
          </div>
        </div>
        {/*TODO margin left calculation to match with fr-container*/}
        <ProjectsTableContainer
          key={intercommunality.code + '-municipalities--table'}
        >
          <ReadProjectsTable scope={scope} projects={municipalitiesProjects} />
        </ProjectsTableContainer>
      </>
    )
  },
)
