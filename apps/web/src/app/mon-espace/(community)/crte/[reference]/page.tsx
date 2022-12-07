import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getAuthenticatedSessionToken } from '@mec/web/auth/getSessionUser'
import ProjectForm from '@mec/web/app/(public)/ProjectForm'
import { Options } from '@mec/web/utils/options'
import { prisma } from '@mec/db'
import { notFound } from 'next/navigation'

const EditCrtePage = async ({
  params: { reference },
}: {
  params: { reference: string }
}) => {
  const sessionToken = getAuthenticatedSessionToken()

  // TODO this query is reused, extract in new file
  const user = await prisma.user.findFirst({
    where: {
      sessions: { some: { sessionToken, expires: { gt: new Date() } } },
    },
    include: {
      communityAccessLevels: {
        where: {
          level: {
            in: ['Owner', 'Write'],
          },
        },
        include: {
          community: true,
        },
      },
    },
  })

  if (!user) {
    throw new Error('User has no read access to any community')
  }

  const project = await prisma.project.findFirst({
    where: {
      reference,
      community: {
        communityAccessLevels: {
          some: { userId: user.id },
        },
      },
    },
    include: { community: true, attachments: true },
  })

  if (!project) {
    return notFound()
  }

  // TODO What are the specs for communities for projects ?
  const communityOptions: Options = user.communityAccessLevels.map(
    (accessLevel) => ({
      name: accessLevel.community.name,
      value: accessLevel.communityId,
    }),
  )

  return (
    <div
      className="fr-pt-4v"
      style={{
        backgroundColor: 'var(--background-alt-blue-france)',
        minHeight: '100%',
        flex: 1,
      }}
    >
      <div className="fr-container">
        <Breadcrumbs
          currentPage={`Projet "${project.name}"`}
          parents={[{ title: 'Gérer et voir mes CRTE', href: '/mon-espace' }]}
        />
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-10 fr-col-lg-8 fr-mb-24v">
            <ProjectForm
              communityOptions={communityOptions}
              project={project}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditCrtePage
