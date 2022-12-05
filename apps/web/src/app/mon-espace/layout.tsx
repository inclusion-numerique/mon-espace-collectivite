import { PropsWithChildren } from 'react'
import { getSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import PrivateHeader from '@mec/web/app/mon-espace/PrivateHeader'
import PublicFooter from '@mec/web/app/(public)/PublicFooter'

const PrivateLayout = async ({ children, ...props }: PropsWithChildren) => {
  const user = await getSessionUser()

  if (!user) {
    return redirect('/connexion/login')
  }

  if (user.status !== 'Active') {
    return redirect('/connexion/en-attente')
  }

  if (!user.onboarded) {
    return redirect('/connexion/onboarding')
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <PrivateHeader user={user} />
      <div className="fr-container" style={{ flex: 1 }}>
        <div>{children}</div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default PrivateLayout
