import Link from 'next/link'

export const Breadcrumbs = ({ currentPage }: { currentPage: string }) => {
  return (
    <div className="fr-container">
      <nav
        role="navigation"
        className="fr-breadcrumb"
        aria-label="vous êtes ici :"
      >
        <button
          className="fr-breadcrumb__button"
          aria-expanded="false"
          aria-controls="breadcrumb-1"
        >
          Voir le fil d’Ariane
        </button>
        <div className="fr-collapse" id="breadcrumb-1">
          <ol className="fr-breadcrumb__list">
            <li>
              <Link className="fr-breadcrumb__link" href="/">
                Accueil
              </Link>
            </li>
            <li>
              <a className="fr-breadcrumb__link" aria-current="page">
                {currentPage}
              </a>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  )
}
