import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@mec/web/prisma'
import { signupUser } from './signupUser'

export const nextAuthAdapter = {
  ...PrismaAdapter(prisma),
  createUser: signupUser,
}
