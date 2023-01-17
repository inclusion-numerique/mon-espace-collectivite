import { PropsWithChildren } from 'react'
import styles from '@mec/web/app/mon-espace/projets/[scale]/[code]/ProjectsTableContainer.module.css'

// We want this container to act as a classic fr-container on the left side, but to expand to the right edge of the screen
export const ProjectsTableContainer = ({ children }: PropsWithChildren) => (
  <div className={styles.container}>{children}</div>
)
