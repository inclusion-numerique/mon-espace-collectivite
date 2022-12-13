import { prismaClient } from '@mec/web/prismaClient'
import { SessionUser } from './sessionUser'

export const getSessionUserFromSessionToken = async (
  sessionToken: string | null,
): Promise<SessionUser | null> => {
  if (!sessionToken) {
    return null
  }

  const res = await prismaClient.session.findFirst({
    where: {
      sessionToken,
      expires: { gt: new Date() },
    },
    include: { user: true },
  })

  if (!res?.user) {
    return null
  }

  return res.user
}
