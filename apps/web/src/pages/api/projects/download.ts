import { NextApiHandler } from 'next'
import { stringify } from 'csv-stringify'
import {
  generateProjectsCsvData,
  projectsCsvFilename,
} from '@mec/web/project/projectsDownload'
import { getSessionUserFromSessionToken } from '@mec/web/auth/getSessionUserFromSessionToken'
import { getSessionTokenFromCookies } from '@mec/web/auth/getSessionTokenFromCookies'

const download: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed')
  }
  const user = await getSessionUserFromSessionToken(
    getSessionTokenFromCookies(req.cookies),
  )

  if (!user) {
    return res.status(401).send('Unauthenticated')
  }

  const data = await generateProjectsCsvData()
  const csv = stringify(data)

  res
    .setHeader('Content-Type', 'text/csv')
    .setHeader(
      'Content-Disposition',
      `attachment;filename=${projectsCsvFilename()}`,
    )
    .send(csv)
}

export default download
