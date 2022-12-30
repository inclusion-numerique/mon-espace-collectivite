import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from '@mec/web/prismaClient'
export default async function health(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const database = await dbStatus()
  const status = database.status
  const headers = req.headers
  const requestInfo = {
    url: req.url,
    query: req.query,
    parsedUrl: new URL(
      req.url ?? '',
      `${headers['x-forwarded-proto']}://${headers.host}`,
    ),
  }

  console.log('Health env:', process.env)

  res
    .status(status === 'ok' ? 200 : 503)
    .json({ status, database, headers, requestInfo })
}

const dbStatus = () =>
  prismaClient.user
    .findMany({ take: 1 })
    .then(() => ({ status: 'ok' }))
    .catch((error) => ({ status: 'error', error }))
