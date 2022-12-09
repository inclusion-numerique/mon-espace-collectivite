import Link from 'next/link'
import { UserMenu } from '@mec/web/app/mon-espace/UserMenu'
import { SessionUser } from '@mec/web/auth/sessionUser'
import PublicHeader from '@mec/web/app/(public)/PublicHeader'

const PrivateHeader = ({ user }: { user: SessionUser }) => {
  return (
    <PublicHeader
      headerTools={
        <div className="fr-header__tools">
          <div className="fr-header__tools-links">
            <ul className="fr-links-group">
              <li>
                <UserMenu user={user} />
              </li>
              <li>
                <Link
                  href="/api/auth/signout"
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
              <UserMenu user={user} />
            </li>
            <li>
              <Link
                href="/api/auth/signout"
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
