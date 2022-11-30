'use client'
import { categories } from '@mec/web/anctProjects'
import styles from '@mec/web/app/(public)/projets/styles.module.css'
import { useCategoriesFilters } from '@mec/web/app/(public)/projets/projectFiltersStore'
import { CSSProperties } from 'react'
import { ProjectFilterResetButton } from '@mec/web/app/(public)/projets/ProjectFilterResetButton'

const selectedStyle: CSSProperties = {}
const unselectedStyle: CSSProperties = {
  // Could not find / apply opacity on emeraude bg color
  backgroundColor: 'rgba(195,250,213, 0.3)',
}

export const ProjectsCategories = () => {
  const selectedCategories = useCategoriesFilters(({ selected }) => selected)
  const toggleCategory = useCategoriesFilters(({ toggle }) => toggle)
  const reset = useCategoriesFilters(({ reset }) => reset)

  return (
    <div className="fr-px-8v">
      <p className="fr-text--regular fr-text--bold fr-text--lg fr-mt-8v fr-mb-2v">
        Thématiques
      </p>
      {categories.map((category) => {
        const isSelected =
          selectedCategories.size === 0 || selectedCategories.has(category)
        return (
          <p
            key={category}
            className={`fr-badge fr-badge--sm fr-badge--green-emeraude fr-mt-2v fr-mr-2v ${styles.categoryFilterTag}`}
            onClick={() => toggleCategory(category)}
            style={isSelected ? selectedStyle : unselectedStyle}
          >
            {category}
          </p>
        )
      })}
      <br />
      <div className="fr-mt-4v">
        <ProjectFilterResetButton
          label={'Voir toutes les thématiques'}
          onClick={reset}
        />
      </div>
    </div>
  )
}
