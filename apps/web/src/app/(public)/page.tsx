import styles from '@mec/web/app/(public)/styles.module.css'
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
              <p className="fr-text--lead">🐒</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
