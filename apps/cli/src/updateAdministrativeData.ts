import 'tsconfig-paths/register'
import { mergeEpciAndCrteData } from '@mec/web/data/epciAndCrteDataSource'
import { mergeMunicipalitiesAndDistrictsData } from '@mec/web/src/data/municipalitiesData'
import { mergeCategories } from '@mec/web/data/categoriesData'
import { mergePerimeters } from '@mec/web/data/aidesTerritoiresData'

const main = async () => {
  await mergeEpciAndCrteData()
  await mergeMunicipalitiesAndDistrictsData()
  await mergeCategories()
  await mergePerimeters()
}

main().then(() => process.exit(0))
