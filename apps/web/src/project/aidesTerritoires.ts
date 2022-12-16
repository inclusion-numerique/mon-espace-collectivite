import axios from 'axios'
import { ProjectForDashboard } from '@mec/web/app/mon-espace/projectsForDashboard'

export const linkToAidesTerritoires = (
  project: ProjectForDashboard,
): string => {
  const targetedAudiences = project.intercommunality ? 'epci' : 'commune'
  const categories = [project.category, ...project.secondaryCategories]
    .map(({ slug }) => `&categories=${slug}`)
    .join('')

  // TODO
  //  - perimeter= avec le numéro du territoire https://aides-territoires.beta.gouv.fr/api/perimeters/?q=lyon&is_visible_to_users=true&is_non_obsolete=true
  const perimeter = ''

  return `https://aides-territoires.beta.gouv.fr/aides/?targeted_audiences=${targetedAudiences}&perimeter=${perimeter}${categories}`
}

type AideTerritoirePerimetersResponse = {
  count: number
  next: string | null
  previous: string | null
  results: AidesTerritoiresPerimeter[]
}

type AidesTerritoiresPerimeter = {
  id: string
  text: string
  name: string
  scale: string
  zipcodes: string[]
}
export const getAideTerritoirePerimeter = async ({
  name,
}: {
  name: string
}): Promise<{
  bestGuess: AidesTerritoiresPerimeter | null
  alternatives: AidesTerritoiresPerimeter[]
}> => {
  const { data } = await axios.get<AideTerritoirePerimetersResponse>(
    `https://aides-territoires.beta.gouv.fr/api/perimeters/?q=${encodeURIComponent(
      name,
    )}&is_visible_to_users=true&is_non_obsolete=true`,
  )

  const [bestGuess, ...alternatives] = data.results

  return { bestGuess: bestGuess ?? null, alternatives: alternatives ?? [] }
}
