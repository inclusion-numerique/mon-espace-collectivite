import { resolve } from 'path'
import { consoleOutput, Output } from '@mec/web/data/csvDataHelpers'
import { existsSync } from 'fs'
import { mkdir, readFile, writeFile } from 'fs/promises'
import axios from 'axios'
import { prismaClient } from '@mec/web/prismaClient'

const dataSourceUrl = 'https://aides-territoires.beta.gouv.fr/api/themes/'

const destinationDirectory = resolve(__dirname, '../../var/data')
const filename = 'categories.json'

const destination = resolve(destinationDirectory, filename)

type CategoriesApiData = {
  count: number
  next: string | null
  previous: string | null
  results: [
    {
      id: number
      name: string
      slug: string
      categories: [
        {
          id: number
          name: string
          slug: string
        },
      ]
    },
  ]
}

export const getCategoriesData = async (output: Output = consoleOutput) => {
  output(`Preparing download to ${destinationDirectory}`)
  if (!existsSync(destinationDirectory)) {
    output(`Creating ${destinationDirectory}`)
    await mkdir(destinationDirectory, { recursive: true })
  }
  output(`Downloading data file located at ${dataSourceUrl}`)
  const { data } = await axios.get<CategoriesApiData>(dataSourceUrl)
  if (data.next) {
    throw new Error(
      'Categories API is now paginated, cannot load categories until this is implemented on our side.',
    )
  }
  await writeFile(destination, JSON.stringify(data, null, 2))
  output(`Data filed downloaded to ${destination}`)
}

// It would be much more performant using UPSERT statements but here performance is not a concern
export const mergeCategories = async (output: Output = consoleOutput) => {
  if (!existsSync(destination)) {
    throw new Error(
      `Data data source should have been downloaded to ${destination}`,
    )
  }

  const dataString = await readFile(destination, 'utf-8')
  const data: CategoriesApiData = JSON.parse(dataString)

  output(`Updating ${data.results.length} themes`)
  await prismaClient.$transaction(
    data.results.map(({ id, slug, name }) =>
      prismaClient.projectTheme.upsert({
        where: { id: id.toString() },
        update: { name, slug },
        create: { name, slug, id: id.toString() },
      }),
    ),
  )

  const categories = data.results
    .map(({ categories, id }) =>
      categories.map((category) => ({ ...category, themeId: id })),
    )
    .flat()
  output(`Updated ${data.results.length} themes`)

  output(`Updating ${categories.length} categories`)
  await prismaClient.$transaction(
    categories.map(({ id, slug, name, themeId }) =>
      prismaClient.projectCategory.upsert({
        where: { id: id.toString() },
        update: { name, slug, themeId: themeId.toString() },
        create: { name, slug, id: id.toString(), themeId: themeId.toString() },
      }),
    ),
  )
  output(`Updated ${categories.length} categories`)
}