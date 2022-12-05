'use client'

import Link from 'next/link'
import { getUserDisplayName } from '@mec/web/utils/user'
import { dashboardRootPath } from '@mec/web/dashboard/dashboard'
import { SessionUser } from '@mec/auth'

export const UserMenu = ({ user }: { user: SessionUser }) => {
  return (
    <Link
      href={dashboardRootPath}
      target="_self"
      className="fr-btn fr-btn--sm fr-btn--icon-left fr-icon-account-circle-fill"
    >
      {getUserDisplayName(user)}
    </Link>
  )
}
