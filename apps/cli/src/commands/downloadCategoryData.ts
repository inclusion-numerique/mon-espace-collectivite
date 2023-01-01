import 'tsconfig-paths/register'
import { getCategoriesData } from '@mec/web/data/categoriesData'

const main = async () => {
  await getCategoriesData()
}

main().then(() => process.exit(0))
