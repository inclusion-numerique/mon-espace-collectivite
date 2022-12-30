import { readFile } from 'fs/promises'
import { resolve } from 'path'

export type CdkOutput = {}

export const getCdkOutput = async (): Promise<CdkOutput> => {
  const outputFile = resolve(__dirname, '../cdk.out.json')
  const outputContents = await readFile(outputFile, 'utf-8')
  const outputs = JSON.parse(outputContents)

  return outputs
}
