import '@mec/web/auth/nextAuthSetup'
import EmailProvider from 'next-auth/providers/email'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrivateConfig } from '@mec/web/config'
import { sendVerificationRequest } from '@mec/web/auth/sendVerificationRequest'
import { nextAuthAdapter } from '@mec/web/auth/nextAuthAdapter'
import { Routes } from '@mec/web/app/routing'

export const authOptions: NextAuthOptions = {
  adapter: nextAuthAdapter,
  pages: {
    signIn: Routes.Connexion.Login,
    signOut: Routes.Connexion.Logout,
    error: Routes.Connexion.Erreur,
    verifyRequest: Routes.Connexion.Verification,
  },
  providers: [
    EmailProvider({
      ...PrivateConfig.Auth.Email,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    signIn: () => {
      return true
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
