import 'tsconfig-paths/register'

import { getCdkOutput } from '@mec/cdk/getCdkOutput'

export const main = async () => {
  console.log('Executing post deployment script')
  console.log('Getting outputs from cdk')
  const outputs = await getCdkOutput()
  console.log('Got outputs', outputs)
  // TODO get DATABASE_URL from outputs
  const databaseUrl = 'todo'

  // TODO exec prisma migrations with DATABASE_URL in command line
  // TODO Check if fixtures are loaded
  // TODO if not load fixtures
}

main().then(() => process.exit(0))
