import 'tsconfig-paths/register'
import { getPerimetersData } from '@mec/web/data/aidesTerritoiresData'

const main = async () => {
  await getPerimetersData()
}

main().then(() => process.exit(0))
