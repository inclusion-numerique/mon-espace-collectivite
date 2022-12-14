import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from '@mec/web/prismaClient'

export default async function health(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const database = await dbStatus()
  const status = database.status
  const headers = req.headers
  const host = req.headers.host
  const containerImage = process.env.MEC_WEB_IMAGE

  res
    .status(status === 'ok' ? 200 : 503)
    .json({ status, database, headers, host, containerImage })
}

const dbStatus = () =>
  prismaClient.$queryRaw`SELECT 1`
    .then(() => ({ status: 'ok' }))
    .catch((error) => ({ status: 'error', error }))
