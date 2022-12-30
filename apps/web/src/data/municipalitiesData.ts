import { resolve } from 'path'
import {
  consoleOutput,
  downloadFile,
  getDataRows,
  Output,
} from '@mec/web/data/csvDataHelpers'
import { existsSync } from 'fs'
import { mkdir } from 'fs/promises'
import { prismaClient } from '@mec/web/prismaClient'
import { dataDirectory } from '@mec/web/data/data'

const fields = [
  // Some territories (TAAF) have no EPCI, we do not include them for now
  'epci_code',
  'com_name',
  'com_code',
  'arrdep_code',
  // When arrdep_name not available (TOM), use arrdep_code instead
  'arrdep_name',
  'dep_code',
  'com_arm_siren_code',
]

const dataSourceUrl = `https://public.opendatasoft.com/explore/dataset/georef-france-commune-arrondissement-municipal/download/?format=csv&fields=${fields.join(
  ',',
)}&timezone=Europe/Berlin&lang=fr&use_labels_for_header=false&csv_separator=%3B`

const destinationDirectory = dataDirectory
const filename = 'municipalities-and-districts.csv'

const destination = resolve(destinationDirectory, filename)

export const getMunicipalitiesAndDistrictsData = async (
  output: Output = consoleOutput,
) => {
  output(`Preparing download to ${destinationDirectory}`)
  if (!existsSync(destinationDirectory)) {
    output(`Creating ${destinationDirectory}`)
    await mkdir(destinationDirectory, { recursive: true })
  }
  // The url redirects to the freshest data csv file
  // const { headers } = await getHeaders(dataSourceUrl)
  // if (!headers.location) {
  //   throw new Error(
  //       `Data gouv data source should redirect to csv file. (${dataSourceUrl})`,
  //   )
  // }
  output(`Downloading data file located at ${dataSourceUrl}`)
  await downloadFile(dataSourceUrl, destinationDirectory, filename)
  output(`Data filed downloaded to ${destination}`)
}

// It would be much more performant using UPSERT statements but here performance is not a concern
const mergeRows = async (output: Output, rows: string[][]) => {
  // For now, do not consider municipalities without intercommunality
  const missingDistricts = ['242900074', '200067072']
  const cleanRows = rows
    .filter((row) => !!row[0])
    // FIXME Missing districts from district dataset. Should be fixed by having an up to date dataset
    .filter((row) => !missingDistricts.includes(row[0]))

  output(
    `Considering ${cleanRows.length} municipalities, from ${
      rows.length
    } total municipalities (${
      rows.length - cleanRows.length
    } without intercommunality)`,
  )

  // Create and merge Districts
  const districts = new Map(
    cleanRows.map(([_0, _1, _2, code, name, countyCode]) => [
      code,
      { code, name, countyCode },
    ]),
  )

  output(`Updating ${districts.size} districts`)
  await prismaClient.$transaction(
    [...districts.values()].map(({ code, name, countyCode }) =>
      prismaClient.district.upsert({
        create: { code, name: name || code, countyCode },
        where: { code },
        update: { name: name || code, countyCode },
      }),
    ),
  )
  output(`Updated ${districts.size} districts`)

  output(
    `Updating ${cleanRows.length} municipalities, from ${
      rows.length
    } total municipalities (${
      rows.length - cleanRows.length
    } without valid intercommunality or district)`,
  )
  await prismaClient.$transaction(
    cleanRows.map(
      ([
        intercommunalityCode,
        name,
        code,
        districtCode,
        _districtName,
        _countyCode,
        siren,
      ]) =>
        prismaClient.municipality.upsert({
          create: { code, name, intercommunalityCode, districtCode, siren },
          where: { code },
          update: { name, intercommunalityCode, districtCode, siren },
        }),
    ),
  )
  output(`Updated ${cleanRows.length} municipalities`)
}

export const mergeMunicipalitiesAndDistrictsData = async (
  output: Output = consoleOutput,
) => {
  if (!existsSync(destination)) {
    throw new Error(
      `Data data source should have been downloaded to ${destination}`,
    )
  }

  output(`Parsing data at ${destination}`)
  const [_header, ...rows] = await getDataRows(destination, ';')
  output(`Got ${rows.length} rows`)
  await mergeRows(output, rows)
}
