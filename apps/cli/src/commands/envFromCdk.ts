import 'tsconfig-paths/register'

import { getCdkOutput } from '@mec/cdk/getCdkOutput'
import { appendFile } from 'fs/promises'
import { resolve } from 'path'

export const main = async () => {
  console.log('Executing post deployment script')
  console.log('Getting outputs from cdk')
  const cdkOutput = await getCdkOutput()
  console.log('Got outputs', cdkOutput)
  const dotenvFile = resolve(__dirname, '../../../../.env')
  await appendFile(
    dotenvFile,
    `
DATABASE_URL=${cdkOutput.databaseUrl}
`,
  )
}

main().then(() => process.exit(0))
