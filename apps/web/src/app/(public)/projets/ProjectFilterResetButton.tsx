import styles from '@mec/web/app/(public)/projets/ProjectFilterResetButton.module.css'

export const ProjectFilterResetButton = ({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) => {
  return (
    <p
      className={`fr-link fr-link--sm fr-mt-8v ${styles.projectFilterResetButton}`}
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    >
      {label}
    </p>
  )
}
