import { SessionUser } from '@mec/web/auth/sessionUser'
import { prisma } from '@mec/web/prisma'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { asyncComponent } from '@mec/web/utils/asyncComponent'
import { NoProjects } from '@mec/web/app/mon-espace/(prefecture)/NoProjects'
import { ProjectsTable } from '@mec/web/app/mon-espace/(prefecture)/ProjectsTable'
import { serialize } from '@mec/web/utils/serialization'

export const PrefectureDashboard = asyncComponent(
  async ({ user }: { user: SessionUser }) => {
    const projects = await prisma.project.findMany({
      where: {
        createdById: user.id,
      },
      include: {
        attachments: true,
        community: true,
      },
      orderBy: { created: 'desc' },
    })

    if (projects.length === 0) {
      return (
        <div className="fr-container">
          <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
          <NoProjects />
        </div>
      )
    }

    const serializedProjects = serialize(projects)
    return (
      <>
        <div className="fr-container">
          <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-col-12">
              <h4>Retrouvez à tout moment vos projets CRTE dans cet espace.</h4>
            </div>
          </div>
        </div>
        <div className="fr-px-4v">
          <ProjectsTable serializedProjects={serializedProjects} />
        </div>
      </>
    )
  },
)