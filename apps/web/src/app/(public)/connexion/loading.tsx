import { Spinner } from '@mec/web/ui/Spinner'
import { AuthCard } from '@mec/web/app/(public)/connexion/AuthCard'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'

const AuthLoading = () => {
  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <AuthCard>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            minHeight: 320,
            flex: 1,
          }}
        >
          <Spinner />
        </div>
      </AuthCard>
    </>
  )
}

export default AuthLoading
