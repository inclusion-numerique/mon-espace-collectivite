import styles from '@mec/web/app/mon-espace/ProjectsTable/CategoryCellContent.module.css'
import { ProjectListItem } from '@mec/web/app/mon-espace/projets/projectsList'

export const CategoryCellContent = ({
  category,
}: Pick<ProjectListItem, 'category'>) => {
  return (
    <div className={styles.category}>
      <span className="fr-badge fr-badge--blue-cumulus fr-badge--sm">
        {category.theme.name.replaceAll(' ', ' ')}
      </span>
      <span className="fr-ml-2v fr-badge fr-badge--pink-macaron fr-badge--sm">
        {category.name.replaceAll(' ', ' ')}
      </span>
    </div>
  )
}
