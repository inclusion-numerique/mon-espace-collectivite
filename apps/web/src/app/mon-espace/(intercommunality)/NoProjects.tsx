import Link from 'next/link'
import { Routes } from '@mec/web/app/routing'
import { Scope } from '@mec/web/scope'

export const NoProjects = ({
  scope,
  canAdd,
}: {
  scope: Scope
  canAdd?: boolean
}) => {
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
        <h2>Vous n&apos;avez pas encore de projets CRTE</h2>
        <p>
          Vous retrouverez dans cet espace l&apos;ensemble des projets CRTE de
          votre collectivité.
        </p>
      </div>
      {canAdd ? (
        <div className="fr-grid-row fr-grid-row--center fr-mt-4v">
          <Link
            href={Routes.MonEspace.Projet.NouveauWithParams(scope)}
            className="fr-btn fr-mb-0"
          >
            Renseigner mon premier projet CRTE
          </Link>
        </div>
      ) : null}
    </div>
  )
}
