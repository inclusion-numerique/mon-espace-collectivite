import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getAuthenticatedSessionToken } from '@mec/web/auth/getSessionUser'
import { notFound } from 'next/navigation'
import { serialize } from '@mec/web/utils/serialization'
import { getUserWithCommunitiesForProjectForm } from '@mec/web/app/mon-espace/ProjectForm/communitiesForProjectForm'
import { getCategoriesOptionsForProjectForm } from '@mec/web/app/mon-espace/ProjectForm/categoriesForProjectForm'
import { getProjectForProjectForm } from '@mec/web/app/mon-espace/ProjectForm/projectForProjectForm'
import ProjectForm from '@mec/web/app/mon-espace/ProjectForm/ProjectForm'

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
    notFound()
    return null
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
