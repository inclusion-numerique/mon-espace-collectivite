import { PropsWithChildren } from 'react'
import styles from '@mec/web/app/mon-espace/ProjectsTable/OneLineTh.module.css'

export const OneLineTh = ({
  title,
  children,
  help,
  ...props
}: PropsWithChildren<
  { title: string; help?: string } & React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
>) => (
  <th {...props}>
    {title.replaceAll(' ', ' ')} {children}
    {typeof help === 'string' ? (
      <span className={styles.help}>{help}</span>
    ) : null}
  </th>
)
