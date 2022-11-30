import '@mec/web/auth/nextAuthSetup'
import EmailProvider from 'next-auth/providers/email'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prismaClient } from '@mec/web/prisma'
import { PrivateConfig } from '@mec/web/config'
import { sendVerificationRequest } from '@mec/web/auth/sendVerificationRequest'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
  providers: [
    EmailProvider({
      ...PrivateConfig.Auth.Email,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    signIn: ({ user }) => {
      return !!user.email?.endsWith('@anct.gouv.fr')
    },
    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
