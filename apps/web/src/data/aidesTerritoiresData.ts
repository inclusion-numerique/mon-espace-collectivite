import { resolve } from 'path'
import { consoleOutput, Output } from '@mec/web/data/csvDataHelpers'
import { existsSync } from 'fs'
import { mkdir, readFile, writeFile } from 'fs/promises'
import axios from 'axios'
import { prismaClient } from '@mec/web/prismaClient'
import { chunk } from 'lodash'
import { dataDirectory } from '@mec/web/data/data'

const dataSourceUrl =
  'https://aides-terr-staging-pr1167.osc-fr1.scalingo.io/api/perimeters/'

// Api has pages 1 based
const getPerimetersPageUrl = (page: number) => `${dataSourceUrl}?page=${page}`

const destinationDirectory = dataDirectory
const filename = 'aides-territoires-perimeters.json'

const destination = resolve(destinationDirectory, filename)

type PerimetersApiData = {
  count: number
  next: string | null
  previous: string | null
  results: PerimetersApiItem[]
}

type PerimetersApiItem = {
  id: string
  text: string
  name: string
  scale: string
  zipcodes: string[]
  code: string
}

export const getPerimetersData = async (output: Output = consoleOutput) => {
  output(`Preparing download to ${destinationDirectory}`)
  if (!existsSync(destinationDirectory)) {
    output(`Creating ${destinationDirectory}`)
    await mkdir(destinationDirectory, { recursive: true })
  }
  output(`Downloading data file located at ${dataSourceUrl}`)
  const { data } = await axios.get<PerimetersApiData>(getPerimetersPageUrl(1))
  const pages = Math.ceil(data.count / data.results.length)
  output(`Downloading ${data.count} items in ${pages} api pages`)

  // already have first page
  const pagesUrls = Array.from({ length: pages - 1 }).map((_, index) =>
    // Start at page 2, end at {pages}
    getPerimetersPageUrl(index + 2),
  )

  // Make requests in chunk to not ddos their service
  const urlChunks = chunk(pagesUrls, 20)
  const results: PerimetersApiItem[] = [...data.results]
  for (const chunkIndex in urlChunks) {
    const urls = urlChunks[chunkIndex]
    const pagesData = await Promise.all(
      urls.map((url: string) =>
        axios.get<PerimetersApiData>(url).then(({ data }) => data.results),
      ),
    )
    results.push(...pagesData.flat())
    output(`Downloaded batch ${parseInt(chunkIndex) + 1} / ${urlChunks.length}`)
  }

  await writeFile(destination, JSON.stringify(results, null, 2))
  output(`Data filed downloaded to ${destination}`)
}

// It would be much more performant using UPSERT statements but here performance is not a concern
export const mergePerimeters = async (output: Output = consoleOutput) => {
  if (!existsSync(destination)) {
    throw new Error(
      `Data data source should have been downloaded to ${destination}`,
    )
  }

  const dataString = await readFile(destination, 'utf-8')
  const data: PerimetersApiItem[] = JSON.parse(dataString)
  const epciPerimeters: PerimetersApiItem[] = []
  const municipalityPerimeters: PerimetersApiItem[] = []
  for (const item of data) {
    if (item.scale === 'EPCI') {
      epciPerimeters.push(item)
      continue
    }
    if (item.scale === 'Commune') {
      municipalityPerimeters.push(item)
    }
  }
  output(
    `Updating ${epciPerimeters.length} EPCI and ${municipalityPerimeters.length} municipalities from ${data.length} aides territoires perimeters`,
  )

  output(`Updating ${epciPerimeters.length} EPCIs`)
  await prismaClient.$transaction(
    epciPerimeters.map(({ id, code }) =>
      prismaClient.intercommunality.updateMany({
        where: { code },
        data: { aidesTerritoiresId: id },
      }),
    ),
  )

  output(`Updating ${municipalityPerimeters.length} municipalities`)
  await prismaClient.$transaction(
    municipalityPerimeters.map(({ id, code }) =>
      prismaClient.municipality.updateMany({
        where: { code },
        data: { aidesTerritoiresId: id },
      }),
    ),
  )

  output(`Updated successfuly`)
}
