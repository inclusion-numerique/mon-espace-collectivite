import Link from 'next/link'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { AuthCard } from '@mec/web/app/(public)/connexion/AuthCard'
import { Routes } from '@mec/web/app/routing'

const errorMessage = (error?: string): string | undefined => {
  if (error === 'Verification') {
    return "Le lien de connexion n'est plus valide. Il a peut-être déjà été utilisé ou est expiré."
  }

  return 'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
}

const ErrorPage = async ({
  searchParams: { error } = {},
}: {
  searchParams?: { error?: string }
}) => {
  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <AuthCard>
        <h2 style={{ textAlign: 'center' }} className="fr-mb-12v">
          Connexion à Mon Espace Collectivité
        </h2>
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
          <h6>Connexion impossible</h6>
          <p>{errorMessage(error)}</p>
        </div>

        <ul className="fr-btns-group fr-mt-12v">
          <li>
            <Link
              href={Routes.Connexion.Login}
              target="_self"
              className="fr-btn"
            >
              Retour
            </Link>
          </li>
        </ul>
      </AuthCard>
    </>
  )
}

export default ErrorPage
