import 'server-only'
import { cookies } from 'next/headers'
import {
  getSessionUserFromSessionToken,
  SessionUser,
  secureSessionCookie,
  sessionCookie,
} from '@mec/auth'

export const getSessionToken = (): string | null => {
  const allCookies = cookies()
  const sessionToken =
    allCookies.get(secureSessionCookie) ?? allCookies.get(sessionCookie)

  if (!sessionToken) {
    return null
  }
  return sessionToken.value
}

export const getAuthenticatedSessionToken = (): string => {
  const token = getSessionToken()
  if (!token) {
    throw new Error('Unauthenticated user')
  }
  return token
}

export const getSessionUser = async (): Promise<SessionUser | null> => {
  const sessionToken = getSessionToken()

  if (!sessionToken) {
    return null
  }
  return getSessionUserFromSessionToken(sessionToken)
}

export const getAuthenticatedSessionUser = () =>
  getSessionUser().then((user) => {
    if (!user) {
      throw new Error('Unauthenticated user')
    }
    return user
  })
