import { PropsWithChildren } from 'react'
import { getSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import PrivateHeader from '@mec/web/app/mon-espace/PrivateHeader'
import PublicFooter from '@mec/web/app/(public)/PublicFooter'

const PrivateLayout = async ({ children, ...props }: PropsWithChildren) => {
  const user = await getSessionUser()

  if (!user) {
    redirect('/connexion/login')
    return null
  }

  if (user.status !== 'Active') {
    redirect('/connexion/en-attente')
    return null
  }

  if (!user.onboarded) {
    redirect('/connexion/onboarding')
    return null
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
