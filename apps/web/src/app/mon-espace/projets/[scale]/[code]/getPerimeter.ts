import { isUserAdmin } from '@mec/web/utils/user'
import { prismaClient } from '@mec/web/prismaClient'
import { SessionUser } from '@mec/web/auth/sessionUser'
import { Scope } from '@mec/web/scope'

export const getAuthorizedCommunity = async ({
  user,
  scope: { scale, code },
}: {
  user: SessionUser
  scope: Scope
}) => {
  const isAdmin = isUserAdmin(user)

  const where = isAdmin
    ? // Admin has access to all scopes and perimeters by name
      { OR: [{ code }, { name: code }] }
    : // Users have to have an access level for this perimeter
      { code, accessLevels: { some: { userId: user.id } } }

  if (scale === 'county') {
    const county = await prismaClient.county.findFirst({
      where,
    })
    return { county }
  }

  if (scale === 'district') {
    const district = await prismaClient.district.findFirst({
      where,
    })
    return { district }
  }

  if (scale === 'intercommunality') {
    const intercommunality = await prismaClient.intercommunality.findFirst({
      where,
      include: {
        crte: true,
      },
    })

    return {
      intercommunality,
    }
  }

  if (scale === 'municipality') {
    const municipality = await prismaClient.municipality.findFirst({
      where,
      include: {
        intercommunality: {
          include: {
            crte: true,
          },
        },
      },
    })
    return { municipality }
  }

  throw new Error('Invalid scale')
}
