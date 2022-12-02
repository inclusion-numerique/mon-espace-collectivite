import Link from 'next/link'

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
    <main role="main" id="content">
      <div className="fr-container fr-container--fluid fr-mb-md-12v fr-mt-12v">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-xl-6 fr-background-alt--grey fr-px-4v fr-py-4v  fr-p-md-14v">
            <h2 style={{ textAlign: 'center' }} className="fr-mb-12v">
              Connexion à votre espace Collectivité
            </h2>
            <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
              <h6>Connexion impossible</h6>
              <p>{errorMessage(error)}</p>
            </div>

            <ul className="fr-btns-group fr-mt-12v">
              <li>
                <Link href="/auth/signin" target="_self" className="fr-btn">
                  Retour
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage
