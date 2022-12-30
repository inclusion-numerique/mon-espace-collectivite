import 'tsconfig-paths/register'
import { mergeEpciAndCrteData } from '@mec/web/data/epciAndCrteDataSource'
import { mergeMunicipalitiesAndDistrictsData } from '@mec/web/data/municipalitiesData'
import { mergeCategories } from '@mec/web/data/categoriesData'
import { mergePerimeters } from '@mec/web/data/aidesTerritoiresData'
import * as process from 'process'
import { prismaClient } from '@mec/web/prismaClient'

const main = async () => {
  if (process.argv.includes('--only-if-empty')) {
    // TODO better check ?
    const existing = await prismaClient.municipality.count({ take: 100 })
    if (existing === 100) {
      console.log('Data has already been loaded, skipping update')
    }
    return
  }
  await mergeEpciAndCrteData()
  await mergeMunicipalitiesAndDistrictsData()
  await mergeCategories()
  await mergePerimeters()
}

main().then(() => process.exit(0))
