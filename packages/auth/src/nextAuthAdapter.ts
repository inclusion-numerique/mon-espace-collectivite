import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@mec/db'
import { signupUser } from './signupUser'

export const nextAuthAdapter = {
  ...PrismaAdapter(prisma),
  createUser: signupUser,
}
