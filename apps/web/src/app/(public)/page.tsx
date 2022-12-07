import Link from 'next/link'
import styles from '@mec/web/app/(public)/styles.module.css'
import { categories, categoryProjectsLink } from '@mec/web/anctProjects'
import { overlayedImageBackground } from '@mec/web/styles/styles'

export default function HomePage() {
  return (
    <>
      <div
        className={styles.cover}
        style={{
          backgroundImage: overlayedImageBackground,
        }}
      >
        <div className="fr-container fr-py-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
              <h1 className={`fr-display--sm ${styles.jumboText}`}>
                Mon espace collectivité
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-container fr-py-6w">
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
            <div
              className={`fr-background-default--grey fr-p-6w ${styles.jumboCard}`}
            >
              <p className="fr-text--lead">
                «
                <strong>
                  La transition écologique est le défi majeur pour notre pays.
                </strong>{' '}
                Les collectivités territoriales sont en première ligne pour y
                faire face. Le partage de solutions concrètes, des réussites
                faites ici ou là, est indispensable pour accélération la
                transition écologique de nos territoires. Ensemble, partageons
                les solutions. »
              </p>
              <p
                className="fr-text--lead fr-mb-2v"
                style={{ textAlign: 'right' }}
              >
                Christophe Béchu
              </p>
              <p className="fr-text fr-mb-0" style={{ textAlign: 'right' }}>
                Ministre de la Transition écologique <br />
                et de la Cohésion des territoires
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-py-4v">
        <div className="fr-container">
          <div className="fr-grid-row fr-mt-1v fr-mb-8v fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-btns-group fr-btns-group--lg">
                <Link
                  href="/projet"
                  className="fr-btn fr-py-8v"
                  style={{ textAlign: 'center' }}
                >
                  Je suis maire ou président d&apos;intercommunalité,
                  <br />
                  je partage mes solutions&nbsp;!
                </Link>
              </div>
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-btns-group fr-btns-group--lg">
                <Link
                  href="/projets"
                  className="fr-btn fr-btn--secondary fr-py-8v"
                  style={{ textAlign: 'center' }}
                >
                  Je suis maire ou président d&apos;intercommunalité, <br />
                  je cherche des solutions&nbsp;!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-background-alt--blue-france">
        <div className="fr-container fr-py-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <h2>Découvrez des solutions partout en France</h2>
            </div>
            {categories.map((category) => (
              <div key={category} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <div className="fr-tile fr-tile--horizontal fr-enlarge-link">
                  <div className="fr-tile__body fr-m-4v">
                    <h4 className="fr-tile__title fr-mb-0">
                      <Link href={categoryProjectsLink(category)}>
                        {category}
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
