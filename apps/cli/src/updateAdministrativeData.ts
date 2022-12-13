import 'tsconfig-paths/register'
import { mergeEpciAndCrteData } from '@mec/web/data/epciAndCrteDataSource'
import { mergeMunicipalitiesAndDistrictsData } from '@mec/web/src/data/municipalitiesData'

const main = async () => {
  await mergeEpciAndCrteData()
  await mergeMunicipalitiesAndDistrictsData()
}

main().then(() => process.exit(0))
