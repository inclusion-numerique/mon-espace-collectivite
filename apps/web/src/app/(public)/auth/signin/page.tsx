import { getUrl } from '@mec/web/utils/baseUrl'
import { EmailSigninForm } from '@mec/web/app/(public)/auth/EmailSigninForm'
import { getSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { PublicConfig } from '@mec/web/config'
import { dashboardRootPath } from '@mec/web/dashboard/dashboard'

const signinErrorMessage = (error?: string): string | undefined => {
  if (!error) {
    return error
  }

  if (error === 'OAuthAccountNotLinked') {
    return 'Vous venez de vous connecter par un nouvelle méthode. Par sécurité, veuillez utiliser la méthode de connexion que vous avez utilisé initiallement.'
  }
  return 'Erreur de connexion, veuillez réessayer.'
}

const SigninPage = async ({
  searchParams: { error } = {},
}: {
  searchParams?: { error?: string }
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getUrl(dashboardRootPath))
    return
  }

  return (
    <main role="main" id="content">
      <div className="fr-container fr-container--fluid fr-mb-md-12v fr-mt-12v">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-xl-6 fr-background-alt--grey fr-px-4v fr-py-4v  fr-p-md-14v">
            <h2 style={{ textAlign: 'center' }} className="fr-mb-12v">
              Connexion à votre espace Collectivité
            </h2>
            {error ? (
              <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
                <p>{signinErrorMessage(error)}</p>
              </div>
            ) : null}
            <EmailSigninForm />
          </div>
        </div>
      </div>
    </main>
  )
}

export default SigninPage
