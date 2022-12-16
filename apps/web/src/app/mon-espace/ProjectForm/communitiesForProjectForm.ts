import { prismaClient } from '@mec/web/prismaClient'
import { Options } from '@mec/web/utils/options'

export const getUserWithCommunitiesForProjectForm = async (
  sessionToken: string,
) => {
  const user = await prismaClient.user.findFirst({
    where: {
      sessions: { some: { sessionToken, expires: { gt: new Date() } } },
    },
    include: {
      municipalityAccessLevels: {
        where: {
          level: {
            in: ['Owner', 'Write'],
          },
        },
        include: {
          municipality: true,
        },
      },
      intercommunalityAccessLevels: {
        where: {
          level: {
            in: ['Owner', 'Write'],
          },
        },
        include: {
          intercommunality: { include: { municipalities: true } },
        },
      },
    },
  })

  if (
    !user ||
    (!user.intercommunalityAccessLevels.length &&
      !user.municipalityAccessLevels.length)
  ) {
    throw new Error('User has no read access to any community')
  }

  const communityOptions: Options = user.intercommunalityAccessLevels.length
    ? user.intercommunalityAccessLevels
        .map((accessLevel) =>
          accessLevel.intercommunality.municipalities.map(({ name, code }) => ({
            name,
            value: code,
          })),
        )
        .flat()
    : user.municipalityAccessLevels.map(({ municipality: { name, code } }) => ({
        name,
        value: code,
      }))

  return { user, communityOptions }
}
