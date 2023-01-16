import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { NoProjects } from '@mec/web/app/mon-espace/(municipality)/NoProjects'
import Link from 'next/link'
import { asyncComponent } from '@mec/web/utils/asyncComponent'
import { WriteProjectsTable } from '@mec/web/app/mon-espace/ProjectsTable/WriteProjectsTable'
import { Crte, Municipality } from '@prisma/client'
import { Routes } from '@mec/web/app/routing'
import { Scope } from '@mec/web/scope'
import { getProjectsList } from '@mec/web/app/mon-espace/projets/projectsList'

export const MunicipalityProjects = asyncComponent(
  async ({
    municipality,
    crte,
  }: {
    municipality: Municipality
    crte: Crte
  }) => {
    const scope: Scope = { scale: 'municipality', code: municipality.code }

    // A municipality dashboard assumes write access on 1 municipality
    const projects = await getProjectsList(scope)
    const title = `Projets ${crte.name}`
    const subtitle = `Municipalité • ${municipality.name}`

    if (projects.length === 0) {
      return (
        <div className="fr-container">
          <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
          <h2 style={{ color: 'var(--blue-france-sun-113-625)' }}>{title}</h2>
          <h3 className="fr-mb-4v">{subtitle}</h3>
          <NoProjects scope={scope} canAdd />
        </div>
      )
    }

    return (
      <>
        <div className="fr-container">
          <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
          <h2 style={{ color: 'var(--blue-france-sun-113-625)' }}>{title}</h2>
        </div>
        <div className="fr-container fr-mt-4v">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-9 ">
              <h3 className="fr-mb-4v">{subtitle}</h3>
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
        <div className="fr-px-4v">
          <WriteProjectsTable projects={projects} scope={scope} />
        </div>
      </>
    )
  },
)
