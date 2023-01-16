import { getAuthenticatedSessionUser } from '@mec/web/auth/getSessionUser'
import { ProjectListScopeForm } from '@mec/web/app/mon-espace/(administrator)/ProjectListScopeForm'
import { PropsWithChildren } from 'react'
import { ProjectNoteFormModal } from '@mec/web/app/mon-espace/ProjectNote/ProjectNoteFormModal'

const ProjectsLayout = async ({ children }: PropsWithChildren) => {
  // For now only Administrators have access to all projects / projects scopes
  const user = await getAuthenticatedSessionUser()

  if (user.roles.includes('Administrator')) {
    // Administrators have access to all projects and can change scope and perimeter
    return (
      <>
        <ProjectListScopeForm />
        {children}
        <ProjectNoteFormModal />
      </>
    )
  }
  return children
}

export default ProjectsLayout
