import { SessionUser } from '@mec/web/auth/sessionUser'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { asyncComponent } from '@mec/web/utils/asyncComponent'
import { NoProjects } from '@mec/web/app/mon-espace/(sub-prefecture)/NoProjects'
import { serialize } from '@mec/web/utils/serialization'
import {
  getProjectsForDashboard,
  groupProjectsByCrte,
} from '@mec/web/app/mon-espace/projectsForDashboard'
import { ReadProjectsTable } from '@mec/web/app/mon-espace/ProjectsTable/ReadProjectsTable'
import { District } from '@prisma/client'
import { ProjectNoteFormModal } from '@mec/web/app/mon-espace/ProjectNoteFormModal'

export const SubPrefectureDashboard = asyncComponent(
  async ({ district }: { user: SessionUser; district: District }) => {
    const projects = await getProjectsForDashboard({ district })

    const title = `Projets de la sous-préfecture • ${district.name}`
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
                      municipalités et EPCIs de votre arrondissement.
                    </p>
                  </div>
                </div>
              </div>
              <div className="fr-container">
                <ReadProjectsTable
                  serializedProjects={serializedProjects}
                  scope={{ district }}
                />
              </div>
            </>
          )
        })}
        <ProjectNoteFormModal />
      </>
    )
  },
)
