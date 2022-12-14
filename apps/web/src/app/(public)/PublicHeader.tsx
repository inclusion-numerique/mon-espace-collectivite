import Link from 'next/link'
import { PublicHeaderNav } from '@mec/web/app/(public)/PublicHeaderNav'
import { ReactNode } from 'react'
import { Routes } from '@mec/web/app/routing'

const PublicHeader = ({
  headerTools = (
    <div className="fr-header__tools">
      <div className="fr-header__tools-links">
        <ul className="fr-btns-group">
          <li>
            <a
              className="fr-btn fr-btn--tertiary fr-icon-account-circle-fill"
              href={Routes.MonEspace.Index}
            >
              Accéder à mon espace
            </a>
          </li>
        </ul>
      </div>
    </div>
  ),
  mobileMenuLinks = (
    <div className="fr-header__menu-links">
      <ul className="fr-btns-group">
        <li>
          <Link
            className="fr-btn fr-btn--icon-left fr-icon-account-circle-fill"
            href={Routes.MonEspace.Index}
          >
            Accéder à mon espace
          </Link>
        </li>
      </ul>
    </div>
  ),
}: {
  headerTools?: ReactNode
  mobileMenuLinks?: ReactNode
}) => {
  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo">
                  <Link
                    href="/"
                    aria-current="page"
                    target="_self"
                    title="Mon espace collectivité"
                    className="nuxt-link-exact-active nuxt-link-active"
                  >
                    <p className="fr-logo">
                      Ministère
                      <br />
                      de la transition
                      <br />
                      écologique
                      <br />
                      et de la cohésion
                      <br />
                      des territoires
                    </p>
                  </Link>
                </div>
                <div className="fr-header__operator">
                  <h2>Mon espace collectivité</h2>
                  <p>
                    Une plateforme unique pour la relation entre État &
                    collectivités
                  </p>
                </div>
                <div className="fr-header__navbar">
                  <button
                    id="fr-btn-menu-mobile"
                    data-fr-opened="false"
                    aria-controls="modal-menu-mobile"
                    aria-haspopup="menu"
                    title="Menu"
                    className="fr-btn--menu fr-btn"
                    data-fr-js-modal-button="true"
                  >
                    Menu
                  </button>
                </div>
              </div>
            </div>
            {headerTools}
          </div>
        </div>
      </div>
      <div
        id="modal-menu-mobile"
        className="fr-header__menu fr-modal"
        data-fr-js-modal="true"
        data-fr-js-header-modal="true"
      >
        <div className="fr-container">
          <button
            aria-controls="modal-menu-mobile"
            className="fr-btn--close fr-btn"
          >
            Fermer
          </button>
          {mobileMenuLinks}
          <nav role="navigation" aria-label="Menu principal" className="fr-nav">
            <PublicHeaderNav />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default PublicHeader
