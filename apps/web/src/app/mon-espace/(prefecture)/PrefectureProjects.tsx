import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { asyncComponent } from '@mec/web/utils/asyncComponent'
import { NoProjects } from '@mec/web/app/mon-espace/(prefecture)/NoProjects'
import { ReadProjectsTable } from '@mec/web/app/mon-espace/ProjectsTable/ReadProjectsTable'
import { County } from '@prisma/client'
import { Scope } from '@mec/web/scope'
import {
  getProjectsList,
  groupProjectsByCrte,
} from '@mec/web/app/mon-espace/projets/projectsList'
import { ProjectsTableContainer } from '@mec/web/app/mon-espace/projets/[scale]/[code]/ProjectsTableContainer'

export const PrefectureProjects = asyncComponent(
  async ({ county }: { county: County }) => {
    const scope: Scope = { scale: 'county', code: county.code }

    const projects = await getProjectsList(scope)

    const title = `Projets • ${county.name}`
    if (projects.length === 0) {
      return (
        <div className="fr-container">
          <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
          <h2 style={{ color: 'var(--blue-france-sun-113-625)' }}>{title}</h2>
          <NoProjects scope={scope} />
        </div>
      )
    }

    const byCrte = groupProjectsByCrte(projects)
    return (
      <>
        <div className="fr-container">
          <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
          <h2 style={{ color: 'var(--blue-france-sun-113-625)' }}>{title}</h2>
        </div>
        {byCrte.map(({ crte, projects: crteProjects }) => {
          return (
            <>
              <div key={crte.code + '-head'} className="fr-container">
                <div className="fr-grid-row">
                  <div className="fr-col-12">
                    <h3>Projets {crte.name}</h3>
                    <p>
                      Retrouvez dans ce tableau les projets renseignés par les
                      municipalités et EPCIs de votre département.
                    </p>
                  </div>
                </div>
              </div>
              <ProjectsTableContainer>
                <ReadProjectsTable projects={crteProjects} scope={scope} />
              </ProjectsTableContainer>
            </>
          )
        })}
      </>
    )
  },
)
