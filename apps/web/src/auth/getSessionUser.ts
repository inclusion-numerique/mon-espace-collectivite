import 'server-only'
import { cookies } from 'next/headers'
import {
  getSessionUserFromSessionToken,
  SessionUser,
  secureSessionCookie,
  sessionCookie,
} from '@mec/auth'

export const getSessionUser = async (): Promise<SessionUser | null> => {
  const allCookies = cookies()
  const sessionToken =
    allCookies.get(secureSessionCookie) ?? allCookies.get(sessionCookie)

  if (!sessionToken) {
    return null
  }
  return getSessionUserFromSessionToken(sessionToken.value)
}

export const getAuthenticatedSessionUser = () =>
  getSessionUser().then((user) => {
    if (!user) {
      throw new Error('Unauthenticated user')
    }
    return user
  })
