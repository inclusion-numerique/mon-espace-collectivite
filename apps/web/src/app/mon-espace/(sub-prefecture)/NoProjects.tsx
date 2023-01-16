import Link from 'next/link'
import { Scope } from '@mec/web/scope'

// TODO Factorize NoProjects components as they are 4 for now...
export const NoProjects = ({}: { scope: Scope }) => {
  return (
    <div
      className="fr-grid-row fr-grid-row--center fr-mb-md-8v fr-mt-8v fr-px-4v fr-p-8v fr-p-md-14v"
      style={{ boxShadow: 'inset 0 0 0 1px var(--border-default-grey)' }}
    >
      <picture>
        <img
          src="/dsfr/artwork/pictograms/document/document.svg"
          alt="Boite email"
          style={{ textAlign: 'center', width: 96 }}
        />
      </picture>
      <div
        className="fr-grid-row fr-grid-row--center"
        style={{ textAlign: 'center' }}
      >
        <h2 style={{ maxWidth: 720 }}>
          Les maires de votre arrondissement n’ont pas encore renseignés leurs
          projets CRTE
        </h2>
        <p>
          Vous retrouverez dans cet espace l’ensemble des projets CRTE de votre
          arrondissement.
        </p>
      </div>
      <div className="fr-grid-row fr-grid-row--center fr-mt-4v">
        <Link href="/" className="fr-btn fr-btn--tertiary fr-mb-0">
          Revenir à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
