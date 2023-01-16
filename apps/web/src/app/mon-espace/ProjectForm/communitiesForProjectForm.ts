import { prismaClient } from '@mec/web/prismaClient'
import { Options } from '@mec/web/utils/options'
import { isUserAdmin } from '@mec/web/utils/user'
import { Scope, scopeToString } from '@mec/web/scope'

export const getUserWithCommunitiesForProjectForm = async (
  sessionToken: string,
  scope?: Scope,
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

  if (!user) {
    throw new Error('Unauthorized')
  }

  if (isUserAdmin(user)) {
    if (scope?.scale === 'intercommunality') {
      const intercommunality =
        await prismaClient.intercommunality.findUniqueOrThrow({
          where: { code: scope.code },
        })
      return {
        user,
        scopeOptions: [
          {
            name: intercommunality.name,
            value: scopeToString(scope),
          },
        ],
      }
    }
    if (scope?.scale === 'municipality') {
      const municipality = await prismaClient.municipality.findUniqueOrThrow({
        where: { code: scope.code },
      })
      return {
        user,
        scopeOptions: [
          {
            name: municipality.name,
            value: scopeToString(scope),
          },
        ],
      }
    }

    throw new Error('Invalid default scope for community options')
  }

  if (
    !user.intercommunalityAccessLevels.length &&
    !user.municipalityAccessLevels.length
  ) {
    throw new Error('User has no read access to any community')
  }

  // Community options must have an ownerCode to allow municipality or intercommunality as project owner
  const scopeOptions: Options = user.intercommunalityAccessLevels.length
    ? user.intercommunalityAccessLevels.map(
        ({ intercommunality: { name, code } }) => ({
          name,
          value: scopeToString({ scale: 'intercommunality', code }),
        }),
      )
    : user.municipalityAccessLevels.map(({ municipality: { name, code } }) => ({
        name,
        value: scopeToString({ scale: 'municipality', code }),
      }))

  return { user, scopeOptions }
}
