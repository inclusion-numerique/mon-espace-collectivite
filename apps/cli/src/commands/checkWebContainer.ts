import 'tsconfig-paths/register'
import { getCdkOutput } from '@mec/cdk/getCdkOutput'

export const main = async () => {
  const cdkOutput = await getCdkOutput()

  if (cdkOutput.webContainerStatus !== 'ready') {
    console.log(
      `👎 Web container is not ready. Status: "${cdkOutput.webContainerStatus}". Deployment have failed.`,
    )
    process.exit(1)
  }

  console.log('👍 Web container is ready')
}

main().then(() => process.exit(0))
