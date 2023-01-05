import 'tsconfig-paths/register'
import { getEpciAndCrteData } from '@mec/cli/data/epciAndCrteDataSource'

const main = async () => {
  await getEpciAndCrteData()
}

main().then(() => process.exit(0))
