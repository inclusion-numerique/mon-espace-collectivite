import 'tsconfig-paths/register'
import { loadFixtures } from '@mec/web/data/fixtures'

const main = async () => {
  await loadFixtures()
}

main().then(() => process.exit(0))
