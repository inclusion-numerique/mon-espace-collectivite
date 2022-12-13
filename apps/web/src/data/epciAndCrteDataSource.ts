import { existsSync } from 'fs'
import { mkdir } from 'fs/promises'
import { resolve } from 'path'
import { prisma } from '@mec/web/prisma'
import {
  consoleOutput,
  downloadFile,
  getDataRows,
  getHeaders,
  Output,
} from '@mec/web/data/csvDataHelpers'

const dataSourceUrl =
  'https://www.data.gouv.fr/fr/datasets/r/cf3d2117-3ce8-4f26-af0b-7a86af450862'

const destinationDirectory = resolve(__dirname, '../../var/data')
const filename = 'epci-and-crte.csv'

const destination = resolve(destinationDirectory, filename)

export const getEpciAndCrteData = async (output: Output = consoleOutput) => {
  output(`Preparing download to ${destinationDirectory}`)
  if (!existsSync(destinationDirectory)) {
    output(`Creating ${destinationDirectory}`)
    await mkdir(destinationDirectory, { recursive: true })
  }
  // The url redirects to the freshest data csv file
  const { headers } = await getHeaders(dataSourceUrl)
  if (!headers.location) {
    throw new Error(
      `Data gouv data source should redirect to csv file. (${dataSourceUrl})`,
    )
  }
  output(`Downloading data file located at ${headers.location}`)
  await downloadFile(headers.location, destinationDirectory, filename)
  output(`Data filed downloaded to ${destination}`)
}

const _rowHeaders = [
  'insee_reg',
  'lib_reg',
  'dep_chef_file',
  'lib_dep',
  'id_crte',
  'lib_crte',
  'type_grp_crte',
  'crte_interreg',
  'crte_interdep',
  'siren_groupement',
  'lib_groupement',
  'nature_juridique',
  'siren_grp_supra',
  'lib_grp_supra',
  'nat_jur_grp_supra',
] as const

// It would be much more performant using UPSERT statements but here performance is not a concern
const mergeRows = async (output: Output, rows: string[][]) => {
  // Create and merge Regions
  const regions = new Map(rows.map(([code, name]) => [code, { code, name }]))

  await prisma.$transaction(
    [...regions.values()].map((data) =>
      prisma.region.upsert({
        create: data,
        where: { code: data.code },
        update: { name: data.name },
      }),
    ),
  )

  // Create and merge Counties
  const counties = new Map(
    rows.map(([regionCode, _1, code, name]) => [
      code,
      { regionCode, code, name },
    ]),
  )

  await prisma.$transaction(
    [...counties.values()].map((data) =>
      prisma.county.upsert({
        create: data,
        where: { code: data.code },
        update: { name: data.name, regionCode: data.regionCode },
      }),
    ),
  )

  // Create and merge CRTE
  const crtes = new Map(
    rows.map(([_0, _1, _2, _3, code, name]) => [code, { code, name }]),
  )
  output(`Updating ${crtes.size} CRTEs`)
  await prisma.$transaction(
    [...crtes.values()].map((data) =>
      prisma.crte.upsert({
        create: data,
        where: { code: data.code },
        update: { name: data.name },
      }),
    ),
  )
  output(`Updated ${crtes.size} CRTEs`)

  output(`Updating ${rows.length} intercommunailities`)
  await prisma.$transaction(
    rows.map(([_0, _1, _2, _3, crteCode, _5, _6, _7, _8, code, name]) =>
      prisma.intercommunality.upsert({
        create: { code, name, crteCode },
        where: { code },
        update: { name, crteCode },
      }),
    ),
  )
  output(`Updated ${rows.length} intercommunailities`)
}

export const mergeEpciAndCrteData = async (output: Output = consoleOutput) => {
  if (!existsSync(destination)) {
    throw new Error(
      `Data data source should have been downloaded to ${destination}`,
    )
  }

  output(`Parsing data at ${destination}`)
  const [_header, ...rows] = await getDataRows(destination)
  output(`Got ${rows.length} rows`)
  await mergeRows(output, rows)
}
