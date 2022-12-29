import Link from 'next/link'
import styles from './styles.module.css'

export default function HomePage() {
  return (
    <>
      <div className="fr-container fr-py-6w">
        <div className={`fr-grid-row fr-grid-row--gutters ${styles.card}`}>
          <div
            className="fr-col-12 fr-col-md-6 fr-p-0"
            style={{ background: '#026056' }}
          >
            <picture>
              <img
                className={`fr-responsive-img`}
                style={{
                  objectFit: 'contain',
                  verticalAlign: 'middle',
                }}
                src="/images/crte.webp"
                alt="Contrat de relance et de transition écologique"
              />
            </picture>
          </div>
          <div
            className={`fr-col-12 fr-col-md-6 fr-p-4v fr-p-md-10v ${styles.text}`}
          >
            <h4>
              TEST_DEPLOY Les contrats de relance et de transition écologique.
            </h4>
            <p style={{ flex: 1 }}>
              Vous êtes maire ou préfet et vous souhaitez gérer ou voir les
              projets CRTE de votre collectivé.
            </p>
            <Link href="/mon-espace" className="fr-btn">
              Accéder à mon espace
            </Link>
          </div>
        </div>
        <div
          className={`fr-grid-row fr-grid-row--gutters fr-mt-12v ${styles.card}`}
        >
          <div className="fr-col-12 fr-col-md-6 fr-p-0">
            <picture>
              <img
                className={`fr-responsive-img`}
                style={{
                  objectFit: 'cover',
                  verticalAlign: 'middle',
                }}
                src="/images/village.webp"
                alt="La France des solutions"
              />
            </picture>
          </div>
          <div
            className={`fr-col-12 fr-col-md-6 fr-p-4v fr-p-md-10v ${styles.text}`}
          >
            <h4>La France des solutions</h4>
            <p style={{ flex: 1 }}>
              Vous êtes maire ou président d’intercommunalité et vous souhaitez
              voir ou partager des solutions concrètes pour accélérer la
              transition écologique des territoires.
            </p>
            <Link
              href="https://lafrancedessolutions.gouv.fr/projets"
              className="fr-link"
              target="_blank"
              rel="noreferrer"
            >
              Voir les projets
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
