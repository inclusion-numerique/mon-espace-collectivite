import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@mec/web/prisma'
export default async function health(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const database = await dbStatus()
  const status = database.status

  res.status(status === 'ok' ? 200 : 503).json({ status, database })
}

const dbStatus = () =>
  prisma.user
    .findMany({ take: 1 })
    .then(() => ({ status: 'ok' }))
    .catch((error) => ({ status: 'error', error }))
