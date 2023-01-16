import { AuthCard } from '@mec/web/app/(public)/connexion/AuthCard'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import Link from 'next/link'

const IndicateursPage = () => {
  return (
    <div className="fr-container">
      <Breadcrumbs currentPage="Indicateurs des collectivités" />
      <AuthCard>
        <div className="fr-grid-row fr-grid-row--center">
          <picture>
            <img
              src="/dsfr/artwork/pictograms/environment/tree.svg"
              alt="Boite email"
              style={{ textAlign: 'center', width: 96 }}
            />
          </picture>
        </div>
        <h2 style={{ textAlign: 'center' }} className="fr-mt-4v">
          Indicateurs des collectivités
        </h2>
        <p style={{ textAlign: 'center' }}>
          Cette fonctionnalité n&apos;est pas encore disponible.
        </p>
        <div className="fr-btns-group">
          <Link href="/" className="fr-btn fr-mb-0">
            Retour à l'accueil
          </Link>
        </div>
      </AuthCard>
    </div>
  )
}

export default IndicateursPage
