import Link from 'next/link'
import { AuthCard } from '@mec/web/app/(public)/connexion/AuthCard'

export const Pending = () => (
  <AuthCard>
    <div className="fr-grid-row fr-grid-row--center">
      <picture>
        <img
          src="/dsfr/artwork/pictograms/system/system.svg"
          alt="Boite email"
          style={{ textAlign: 'center', width: 96 }}
        />
      </picture>
    </div>
    <h2 style={{ textAlign: 'center' }} className="fr-mt-4v">
      Compte en attente
    </h2>
    <p style={{ textAlign: 'center' }}>
      Nous avons besoin de vérifier votre identité avant de créer votre Espace
      Collectivité.
      <br />
      <br />
      Vous serez informé par email dès que votre espace sera actif.
    </p>
    <div className="fr-btns-group">
      <Link href="/" className="fr-btn fr-mb-0">
        J&apos;ai compris
      </Link>
    </div>
  </AuthCard>
)
