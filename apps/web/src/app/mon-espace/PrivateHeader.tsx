import Link from 'next/link'
import { UserMenu } from '@mec/web/app/mon-espace/UserMenu'
import { SessionUser } from '@mec/web/auth/sessionUser'
import PublicHeader from '@mec/web/app/(public)/PublicHeader'
import { serialize } from '@mec/web/utils/serialization'
import { Routes } from '@mec/web/app/routing'

const PrivateHeader = ({ user }: { user: SessionUser }) => {
  const serializedUser = serialize(user)
  return (
    <PublicHeader
      headerTools={
        <div className="fr-header__tools">
          <div className="fr-header__tools-links">
            <ul className="fr-links-group">
              <li>
                <UserMenu serializedUser={serializedUser} />
              </li>
              <li>
                <Link
                  href={Routes.Connexion.Logout}
                  target="_self"
                  className="fr-btn fr-btn--sm fr-btn--icon-left fr-icon-logout-box-r-line"
                >
                  Se déconnecter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      }
      mobileMenuLinks={
        <div className="fr-header__menu-links">
          <ul className="fr-btns-group">
            <li>
              <UserMenu serializedUser={serializedUser} />
            </li>
            <li>
              <Link
                href={Routes.Connexion.Logout}
                target="_self"
                className="fr-btn fr-btn--sm fr-btn--icon-left fr-icon-logout-box-r-line"
              >
                Se déconnecter
              </Link>
            </li>
          </ul>
        </div>
      }
    />
  )
}

export default PrivateHeader
