import { prisma } from '@mec/db'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getAuthenticatedSessionUser } from '@mec/web/auth/getSessionUser'
import { NoProjects } from '@mec/web/app/mon-espace/(community)/NoProjects'
import { ProjectsTable } from '@mec/web/app/mon-espace/(community)/ProjectsTable'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import Link from 'next/link'

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
    <>
      <div className="fr-container">
        <Breadcrumbs currentPage="Gérer et voir mes CRTE" />
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-9 ">
            <h4>Retrouvez à tout moment vos projets CRTE dans cet espace.</h4>
            <p>
              Vous pouvez modifier les différentes informations de vos projets
              en cliquant directement dans le tableau.
            </p>
          </div>
          <div className="fr-col-12 fr-col-md-3 fr-col--middle">
            <div className="fr-btns-group fr-btns-group--icon-left">
              <Link
                className="fr-btn fr-icon-add-line"
                href="/mon-espace/crte/nouveau"
              >
                Ajouter un nouveau projet
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-px-4v">
        <ProjectsTable projects={projects} />
      </div>
    </>
  )
}
export default ProjectsPage
