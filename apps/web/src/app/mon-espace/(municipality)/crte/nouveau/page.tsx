import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getAuthenticatedSessionToken } from '@mec/web/auth/getSessionUser'
import ProjectForm from '@mec/web/app/mon-espace/(municipality)/crte/ProjectForm'
import { serialize } from '@mec/web/utils/serialization'
import { getUserWithCommunitiesForProjectForm } from '@mec/web/app/mon-espace/(municipality)/communitiesForProjectForm'
import { getCategoriesOptionsForProjectForm } from '@mec/web/app/mon-espace/(municipality)/categoriesForProjectForm'

const NewCrtePage = async () => {
  const sessionToken = getAuthenticatedSessionToken()
  const { user, communityOptions } = await getUserWithCommunitiesForProjectForm(
    sessionToken,
  )

  const categoriesOptions = await getCategoriesOptionsForProjectForm()

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
          currentPage="Nouveau CRTE"
          parents={[{ title: 'Gérer et voir mes CRTE', href: '/mon-espace' }]}
        />
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-10 fr-col-lg-8 fr-mb-24v">
            <ProjectForm
              serializedUser={serialize(user)}
              communityOptions={communityOptions}
              categoriesOptions={categoriesOptions}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewCrtePage
