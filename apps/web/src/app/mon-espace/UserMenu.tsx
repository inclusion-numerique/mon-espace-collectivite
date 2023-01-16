'use client'

import Link from 'next/link'
import { getUserDisplayName } from '@mec/web/utils/user'
import { SessionUser } from '@mec/web/auth/sessionUser'
import { deserialize, Serialized } from '@mec/web/utils/serialization'
import { Routes } from '@mec/web/app/routing'

export const UserMenu = ({
  serializedUser,
}: {
  serializedUser: Serialized<SessionUser>
}) => {
  const user = deserialize(serializedUser)
  return (
    <Link
      href={Routes.MonEspace.Index}
      target="_self"
      className="fr-btn fr-btn--sm fr-btn--icon-left fr-icon-account-circle-fill"
    >
      {getUserDisplayName(user)}
    </Link>
  )
}
