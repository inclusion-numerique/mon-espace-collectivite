import { SessionUser } from '@mec/web/auth/sessionUser'

export const getUserDisplayName = (
  user: Pick<SessionUser, 'firstName' | 'lastName' | 'email' | 'name'>,
): string => {
  const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
  if (name) {
    return name
  }

  // Some oauth provider give the name in a single property
  if (user.name) {
    return user.name
  }

  return user.email
}

export const getUserFullDisplayRole = (
  user: Pick<SessionUser, 'roles'>,
): string => {
  // TODO
  return ''
}

export const userHasSomeRole = (
  user: Pick<SessionUser, 'roles'>,
  oneOf: SessionUser['roles'][number][],
) => {
  return !!oneOf.find((role) => user.roles.includes(role))
}
export const userHasRole = (
  user: Pick<SessionUser, 'roles'>,
  role: SessionUser['roles'][number],
) => {
  return !!user.roles.includes(role)
}

export const isUserAdmin = (user: Pick<SessionUser, 'roles'>) =>
  userHasRole(user, 'Administrator')
