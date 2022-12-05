import { EmailSigninForm } from '@mec/web/app/(public)/connexion/EmailSigninForm'
import { AuthCard } from '@mec/web/app/(public)/connexion/AuthCard'

const signinErrorMessage = (error?: string): string | undefined => {
  if (!error) {
    return error
  }

  if (error === 'OAuthAccountNotLinked') {
    return 'Vous venez de vous connecter par un nouvelle méthode. Par sécurité, veuillez utiliser la méthode de connexion que vous avez utilisé initiallement.'
  }
  return 'Erreur de connexion, veuillez réessayer.'
}

export const Signin = ({ error }: { error?: string }) => (
  <AuthCard>
    <h2 style={{ textAlign: 'center' }} className="fr-mb-12v">
      Connexion à Mon Espace Collectivité
    </h2>
    {error ? (
      <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
        <p>{signinErrorMessage(error)}</p>
      </div>
    ) : null}
    <EmailSigninForm />
  </AuthCard>
)
