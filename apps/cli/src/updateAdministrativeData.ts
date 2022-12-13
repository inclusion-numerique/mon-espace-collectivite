import 'tsconfig-paths/register'
import { mergeEpciAndCrteData } from '@mec/web/data/epciAndCrteDataSource'
import { mergeMunicipalitiesAndDistrictsData } from '@mec/web/src/data/municipalitiesData'
import { mergeCategories } from '@mec/web/data/categoriesData'

const main = async () => {
  await mergeEpciAndCrteData()
  await mergeMunicipalitiesAndDistrictsData()
  await mergeCategories()
}

main().then(() => process.exit(0))
