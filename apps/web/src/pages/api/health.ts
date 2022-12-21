import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from '@mec/web/prismaClient'
export default async function health(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const database = await dbStatus()
  const status = database.status
  const headers = req.headers

  res.status(status === 'ok' ? 200 : 503).json({ status, database, headers })
}

const dbStatus = () =>
  prismaClient.user
    .findMany({ take: 1 })
    .then(() => ({ status: 'ok' }))
    .catch((error) => ({ status: 'error', error }))
