import { AcknowledgeOnboardingButton } from '@mec/web/app/(public)/connexion/onboarding/AcknowledgeOnboardingButton'

export const Onboarding = ({ name, role }: { name: string; role: string }) => (
  <>
    <div className="fr-grid-row fr-grid-row--center">
      <picture>
        <img
          src="/dsfr/artwork/pictograms/system/success.svg"
          alt="Boite email"
          style={{ textAlign: 'center', width: 96 }}
        />
      </picture>
    </div>
    <h2 style={{ textAlign: 'center' }} className="fr-mt-4v">
      Votre compte a bien été crée&nbsp;!
    </h2>
    <p style={{ textAlign: 'center' }}>
      Vous êtes identifié en tant que&nbsp;:
      <br />
      <strong>
        {name}
        {role ? `, ${role}` : null}
      </strong>
    </p>
    <div className="fr-btns-group">
      <AcknowledgeOnboardingButton />
    </div>
  </>
)
