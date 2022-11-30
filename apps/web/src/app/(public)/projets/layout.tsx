import { PropsWithChildren } from 'react'
import styles from '@mec/web/app/(public)/styles.module.css'
import { overlayedImageBackground } from '@mec/web/styles/styles'

const ProjectsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div
        className={styles.cover}
        style={{ backgroundImage: overlayedImageBackground }}
      >
        <div className="fr-container fr-py-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
              <h4 className={`fr-display--xs ${styles.jumboText}`}>
                Retrouvez ici les projets et réalisations des collectivités.
              </h4>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}

export default ProjectsLayout
