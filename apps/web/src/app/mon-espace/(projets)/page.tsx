import { projectsCsvFilename } from '@mec/web/project/projectsDownload'
import Link from 'next/link'
import { prisma } from '@mec/db'
import { dashboardRootPath } from '@mec/web/dashboard/dashboard'

const ProjectsPage = async () => {
  const projectsCount = await prisma.project.count()
  const downloadFilename = projectsCsvFilename()

  const projects = await prisma.project.findMany({
    include: {
      attachments: true,
      community: true,
    },
    orderBy: { created: 'desc' },
  })

  return (
    <>
      <div className="fr-grid-row fr-pt-8v">
        <h2>Mon espace collectivité</h2>
      </div>
      <div className="fr-grid-row fr-mt-2v fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body">
              <div className="fr-card__content">
                <h4 className="fr-card__title">
                  <span className="fr-icon-folder-2-fill fr-mr-2v" />
                  Projets
                </h4>
                <div className="fr-card__desc fr-pt-4v">
                  <p>{projectsCount} projets ont été enregistrés.</p>
                  <a
                    className="fr-btn fr-btn--icon-left fr-icon-download-line"
                    href="/api/projects/download"
                    download={downloadFilename}
                  >
                    Télécharger au format CSV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-grid-row fr-mt-8v">
        <div className="fr-col-12">
          <h4 className="fr-card__title">
            <span className="fr-icon-time-line fr-mr-2v" />
            Derniers projets
          </h4>
        </div>
        <div className="fr-col-12">
          <div className="fr-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Projet</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="fr-table">
                {projects.map(
                  ({
                    id,
                    created,
                    name,
                    contactEmail,
                    community,
                    reference,
                  }) => (
                    <tr key={id}>
                      <td>
                        {created.toLocaleDateString()} à{' '}
                        {created.toLocaleTimeString()}
                      </td>
                      <td>{community.name}</td>
                      <td>{name}</td>
                      <td>
                        <a
                          href={`mailto:${contactEmail}`}
                          className="fr-link fr-link--sm"
                        >
                          {contactEmail}
                        </a>
                      </td>
                      <td>
                        <Link
                          prefetch={false}
                          className="fr-btn fr-btn--icon-left fr-btn--secondary fr-btn--sm fr-icon-eye-line"
                          href={`${dashboardRootPath}/${reference}`}
                        >
                          Détails
                        </Link>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProjectsPage
