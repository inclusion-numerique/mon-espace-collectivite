import 'tsconfig-paths/register'
import { getMunicipalitiesAndDistrictsData } from '@mec/cli/data/municipalitiesData'

const main = async () => {
  await getMunicipalitiesAndDistrictsData()
}

main().then(() => process.exit(0))
