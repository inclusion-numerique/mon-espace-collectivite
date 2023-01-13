import { SessionUser } from '@mec/web/auth/sessionUser'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { asyncComponent } from '@mec/web/utils/asyncComponent'
import { NoProjects } from '@mec/web/app/mon-espace/(prefecture)/NoProjects'
import { serialize } from '@mec/web/utils/serialization'
import { ReadProjectsTable } from '@mec/web/app/mon-espace/ProjectsTable/ReadProjectsTable'
import {
  getProjectsForDashboard,
  groupProjectsByCrte,
} from '@mec/web/app/mon-espace/projectsForDashboard'
import { County } from '@prisma/client'

export const PrefectureDashboard = asyncComponent(
  async ({ county }: { user: SessionUser; county: County }) => {
    const projects = await getProjectsForDashboard({ county })

    const title = `Projets • ${county.name}`
    if (projects.length === 0) {
      return (
        <div className="fr-container">
          <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
          <h2 style={{ color: 'var(--blue-france-sun-113-625)' }}>{title}</h2>
          <NoProjects />
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
          const serializedProjects = serialize(crteProjects)
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
              <div className="fr-container">
                <ReadProjectsTable
                  serializedProjects={serializedProjects}
                  scope={{ county: { code: county.code } }}
                />
              </div>
            </>
          )
        })}
      </>
    )
  },
)
