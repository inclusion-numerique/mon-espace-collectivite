import 'tsconfig-paths/register'
import { mergeEpciAndCrteData } from '@mec/cli/data/epciAndCrteDataSource'
import { mergeMunicipalitiesAndDistrictsData } from '@mec/cli/data/municipalitiesData'
import * as process from 'process'
import { prismaClient } from '@mec/web/prismaClient'
import { mergeCategories } from '@mec/cli/data/categoriesData'

const main = async () => {
  if (process.argv.includes('--only-if-empty')) {
    // TODO better check ?
    const existing = await prismaClient.municipality.count({ take: 100 })
    if (existing === 100) {
      console.log('Data has already been loaded, skipping update')
      return
    }
    console.log('Data has has not been loaded yet, updating from data source')
  }
  await mergeEpciAndCrteData()
  await mergeMunicipalitiesAndDistrictsData()
  await mergeCategories()
  // await mergePerimeters()
}

main().then(() => process.exit(0))
