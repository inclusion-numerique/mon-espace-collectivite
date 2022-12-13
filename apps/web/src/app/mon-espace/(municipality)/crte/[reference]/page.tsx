import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getAuthenticatedSessionToken } from '@mec/web/auth/getSessionUser'
import { Options } from '@mec/web/utils/options'
import { prismaClient } from '@mec/web/prismaClient'
import { notFound } from 'next/navigation'
import ProjectForm from '@mec/web/app/mon-espace/(municipality)/crte/ProjectForm'
import { getUserWithCommunitiesForProjectForm } from '@mec/web/app/mon-espace/(municipality)/communitiesForProjectForm'
import { getProjectForProjectForm } from '@mec/web/app/mon-espace/(municipality)/projectForProjectForm'
import { getCategoriesOptionsForProjectForm } from '@mec/web/app/mon-espace/(municipality)/categoriesForProjectForm'
import { serialize } from '@mec/web/utils/serialization'

const EditCrtePage = async ({
  params: { reference },
}: {
  params: { reference: string }
}) => {
  const sessionToken = getAuthenticatedSessionToken()
  const { user, communityOptions } = await getUserWithCommunitiesForProjectForm(
    sessionToken,
  )

  const categoriesOptions = await getCategoriesOptionsForProjectForm()
  const project = await getProjectForProjectForm(reference)

  if (!project) {
    return notFound()
  }

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
              serializedUser={serialize(user)}
              categoriesOptions={categoriesOptions}
              communityOptions={communityOptions}
              serializedProject={serialize(project)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditCrtePage
