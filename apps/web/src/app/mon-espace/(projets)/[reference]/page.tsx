import { prisma } from '@mec/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { dashboardRootPath } from '@mec/web/dashboard/dashboard'
import { ViewAttachmentButton } from '@mec/web/app/mon-espace/(projets)/[reference]/ViewAttachmentButton'

const ProjectPage = async ({
  params: { reference },
}: {
  params: { reference: string }
}) => {
  const project = await prisma.project.findUnique({
    where: { reference },
    include: { community: true, attachments: true },
  })
  if (!project) {
    return notFound()
  }

  const {
    created,
    community,
    attachments,
    name,
    description,
    contactEmail,
    topic,
  } = project

  const onViewAttachment = ({}: { key: string; name: string }) => {}
  const onDownloadAttachment = ({}: { key: string; name: string }) => {}

  return (
    <>
      <div className="fr-grid-row fr-pt-8v">
        <div className="fr-col-12">
          <Link
            href={dashboardRootPath}
            className="fr-link fr-link--icon-left fr-icon-arrow-left-line"
          >
            Retour
          </Link>
        </div>
      </div>
      <div className="fr-grid-row fr-mt-8v fr-mb-12v fr-grid-row--center">
        <div className="fr-col-12">
          <div className="fr-card">
            <div className="fr-card__body">
              <div className="fr-card__content">
                <div className="fr-card__desc">
                  <div className="fr-grid-row">
                    <h2 className="">
                      <span className="fr-icon-folder-2-fill fr-mr-2v" />
                      Projet &#8220;{name}&#8221;
                    </h2>
                  </div>
                  <div className="fr-grid-row fr-grid-row--gutters">
                    <div className="fr-col-12 fr-col-lg-6">
                      <h5>Informations</h5>
                      <div className="fr-table fr-table--">
                        <table>
                          <tbody>
                            <tr>
                              <td>Date</td>
                              <td className="fr-text--bold">
                                {created.toLocaleDateString()} à{' '}
                                {created.toLocaleTimeString()}
                              </td>
                            </tr>
                            <tr>
                              <td>Référence</td>
                              <td className="fr-text--bold">{reference}</td>
                            </tr>
                            <tr>
                              <td>Thématique</td>
                              <td className="fr-text--bold">{topic}</td>
                            </tr>
                            <tr>
                              <td>Collectivité</td>
                              <td>
                                <span className="fr-text--bold">
                                  {community.name}
                                </span>{' '}
                                <span className="fr-badge fr-badge--sm fr-badge--blue-cumulus fr-ml-2v">
                                  {community.scale}
                                </span>
                                <span className="fr-text--sm fr-ml-2v">
                                  {community.zipcodes.join(', ')}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Nom</td>
                              <td className="fr-text--bold">{name}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td className="fr-text--bold">
                                <a
                                  href={`mailto:${contactEmail}`}
                                  className="fr-link fr-link--sm"
                                >
                                  {contactEmail}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="fr-col-12 fr-col-lg-6">
                      <h5>Description</h5>
                      <p>{description}</p>
                    </div>
                    <div className="fr-col-12 fr-col-lg-6">
                      <h5>Pièces jointes</h5>
                      {attachments.length > 0 ? (
                        <div className="fr-table fr-table--">
                          <table>
                            <tbody>
                              {attachments.map(({ name, key, type }) => (
                                <tr key={key}>
                                  <td>
                                    <span className="fr-badge fr-badge--sm fr-badge--yellow-moutarde">
                                      {type}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="fr-text--bold">
                                      {name}
                                    </span>
                                  </td>

                                  <td>
                                    <ViewAttachmentButton
                                      fileKey={key}
                                      name={name}
                                      reference={reference}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p>Aucune pièce jointe</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProjectPage
