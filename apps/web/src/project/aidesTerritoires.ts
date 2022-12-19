import { ProjectForDashboard } from '@mec/web/app/mon-espace/projectsForDashboard'

export const linkToAidesTerritoires = (
  project: ProjectForDashboard,
): string => {
  const targetedAudiences = project.intercommunality ? 'epci' : 'commune'
  const categories = [project.category, ...project.secondaryCategories]
    .map(({ slug }) => `&categories=${slug}`)
    .join('')

  // See https://aides-territoires.beta.gouv.fr/api/perimeters/?q=lyon&is_visible_to_users=true&is_non_obsolete=true
  const perimeter =
    project.intercommunality?.aidesTerritoiresId ??
    project.municipality?.aidesTerritoiresId ??
    ''

  return `https://aides-territoires.beta.gouv.fr/aides/?targeted_audiences=${targetedAudiences}&perimeter=${perimeter}${categories}`
}
