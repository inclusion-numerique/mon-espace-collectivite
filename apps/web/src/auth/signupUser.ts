import { prismaClient } from '@mec/web/prismaClient'
import { AdapterUser } from 'next-auth/adapters'

// TODO Unit test this
export const signupUser = async (
  user: Omit<AdapterUser, 'id'>,
): Promise<AdapterUser> => {
  const preRegistration = await prismaClient.preRegistration.findUnique({
    where: { email: user.email.toLowerCase() },
  })

  if (!preRegistration || !preRegistration.allowSignup) {
    return prismaClient.user.create({
      data: {
        ...user,
        roles: ['User'],
        status: 'Pending',
      },
    })
  }

  const {
    role,
    firstName,
    lastName,
    name,
    image,
    location,
    title,
    description,
    level,
    municipalityCode,
    intercommunalityCode,
    districtCode,
    countyCode,
  } = preRegistration

  return prismaClient.user.create({
    data: {
      ...user,
      status: 'Active',
      roles: [role],
      firstName,
      lastName,
      name,
      image,
      location,
      title,
      description,
      municipalityAccessLevels:
        municipalityCode && level
          ? {
              create: {
                municipalityCode,
                level,
              },
            }
          : undefined,
      intercommunalityAccessLevels:
        intercommunalityCode && level
          ? {
              create: {
                intercommunalityCode,
                level,
              },
            }
          : undefined,
      districtAccessLevels:
        districtCode && level
          ? {
              create: {
                districtCode,
                level,
              },
            }
          : undefined,
      countyAccessLevels:
        countyCode && level
          ? {
              create: {
                countyCode,
                level,
              },
            }
          : undefined,
    },
  })
}
