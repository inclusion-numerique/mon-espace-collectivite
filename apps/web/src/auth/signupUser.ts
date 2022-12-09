import { prisma } from '@mec/web/prisma'
import { AdapterUser } from 'next-auth/adapters'

// TODO Unit test this
export const signupUser = async (
  user: Omit<AdapterUser, 'id'>,
): Promise<AdapterUser> => {
  const preAuth = await prisma.preAuthorization.findUnique({
    where: { email: user.email.toLowerCase() },
  })

  console.log('SIGN UP USER', { preAuth })

  if (!preAuth || !preAuth.allowSignup) {
    return prisma.user.create({
      data: {
        ...user,
        roles: [],
        status: 'Pending',
      },
    })
  }

  return prisma.user.create({
    data: {
      ...user,
      status: 'Active',
      roles: [preAuth.role],
      firstName: preAuth.firstName,
      lastName: preAuth.lastName,
      name: preAuth.name,
      image: preAuth.image,
      location: preAuth.location,
      title: preAuth.title,
      description: preAuth.description,
      communityAccessLevels:
        preAuth.communityId && preAuth.level
          ? {
              createMany: {
                data: [
                  {
                    communityId: preAuth.communityId,
                    level: preAuth.level,
                  },
                ],
              },
            }
          : undefined,
    },
  })
}
