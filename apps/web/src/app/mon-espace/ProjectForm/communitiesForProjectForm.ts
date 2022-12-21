import { prismaClient } from '@mec/web/prismaClient'
import { Options } from '@mec/web/utils/options'
import { perimeterCodeToOwnerCode } from '@mec/web/project/project'

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

  // Community options must have an ownerCode to allow municipality or intercommunality as project owner
  const communityOptions: Options = user.intercommunalityAccessLevels.length
    ? user.intercommunalityAccessLevels.map(
        ({ intercommunality: { name, code } }) => ({
          name,
          value: perimeterCodeToOwnerCode({ intercommunalityCode: code }),
        }),
      )
    : user.municipalityAccessLevels.map(({ municipality: { name, code } }) => ({
        name,
        value: perimeterCodeToOwnerCode({ municipalityCode: code }),
      }))

  return { user, communityOptions }
}
