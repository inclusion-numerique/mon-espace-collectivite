import { PropsWithChildren } from 'react'
import { getSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import PrivateHeader from '@mec/web/app/mon-espace/PrivateHeader'
import PublicFooter from '@mec/web/app/(public)/PublicFooter'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getUserDisplayName, getUserFullDisplayRole } from '@mec/web/utils/user'
import { Onboarding } from '@mec/web/app/mon-espace/(onboarding)/Onboarding'
import { Pending } from '@mec/web/app/mon-espace/(onboarding)/Pending'
import { Routes } from '@mec/web/app/routing'
import PublicLayout from '@mec/web/app/(public)/layout'

const LoggedInUserWithoutFullAccess = ({
  breadcrumbsCurrentPage = 'Création de compte',
  children,
}: PropsWithChildren<{ breadcrumbsCurrentPage?: string }>) => (
  <PublicLayout>
    <div className="fr-container">
      <Breadcrumbs currentPage={breadcrumbsCurrentPage} />
      {children}
    </div>
  </PublicLayout>
)

const PrivateLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(Routes.Connexion.Login)
    return null
  }

  const isActive = user.status === 'Active'

  if (!isActive) {
    return (
      <LoggedInUserWithoutFullAccess>
        <Pending email={user.email} />
      </LoggedInUserWithoutFullAccess>
    )
  }

  if (!user.onboarded) {
    return (
      <LoggedInUserWithoutFullAccess>
        <Onboarding
          name={getUserDisplayName(user)}
          role={getUserFullDisplayRole(user)}
        />
      </LoggedInUserWithoutFullAccess>
    )
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <PrivateHeader user={user} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
      <PublicFooter />
    </div>
  )
}

export default PrivateLayout
