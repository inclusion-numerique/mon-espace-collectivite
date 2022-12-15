import { SessionUser } from '@mec/web/auth/sessionUser'
import { prismaClient } from '@mec/web/prismaClient'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { NoProjects } from '@mec/web/app/mon-espace/(municipality)/NoProjects'
import Link from 'next/link'
import { ProjectsTable } from '@mec/web/app/mon-espace/(municipality)/ProjectsTable'
import { asyncComponent } from '@mec/web/utils/asyncComponent'
import { serialize } from '@mec/web/utils/serialization'

export const CommunityDashboard = asyncComponent(
  async ({ user }: { user: SessionUser }) => {
    const projects = await prismaClient.project.findMany({
      where: {
        createdById: user.id,
      },
      include: {
        category: { include: { theme: true } },
        secondaryCategories: { include: { theme: true } },
        attachments: true,
        municipality: true,
        intercommunality: true,
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
        <div className="fr-container">
          <ProjectsTable serializedProjects={serializedProjects} />
        </div>
      </>
    )
  },
)
