import { prisma } from '@mec/db'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getAuthenticatedSessionUser } from '@mec/web/auth/getSessionUser'
import { NoProjects } from '@mec/web/app/mon-espace/(community)/NoProjects'
import { ProjectsTable } from '@mec/web/app/mon-espace/(community)/ProjectsTable'

const ProjectsPage = async () => {
  const user = await getAuthenticatedSessionUser()
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
      <>
        <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
        <NoProjects />
      </>
    )
  }

  return (
    <div className="fr-container fr-container-lg">
      <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
      <div className="fr-grid-row fr-pt-8v">
        <h4>Retrouvez à tout moment vos projets CRTE dans cet espace.</h4>
        <p>
          Vous pouvez modifier les différentes informations de vos projets en
          cliquant directement dans le tableau.
        </p>
      </div>
      <div className="fr-grid-row fr-mt-8v">
        <div className="fr-col-12">
          <ProjectsTable projects={projects} />
        </div>
      </div>
    </div>
  )
}
export default ProjectsPage
