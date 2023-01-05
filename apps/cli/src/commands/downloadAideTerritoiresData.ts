import 'tsconfig-paths/register'
import { getPerimetersData } from '@mec/cli/data/aidesTerritoiresData'

// As of 05/01/2023 their API is down
const main = async () => {
  await getPerimetersData()
}

main().then(() => process.exit(0))
