const AppNotFound = () => {
  return (
    <main role="main" id="content">
      <div className="fr-container">
        <div className="fr-my-7w fr-mt-md-12w fr-mb-md-10w fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-grid-row--center">
          <div className="fr-py-0 fr-col-12 fr-col-md-6">
            <h1>Page non trouvée</h1>
            <p className="fr-text--sm fr-mb-3w">Erreur 404</p>
            <p className="fr-text--lead fr-mb-3w">
              La page que vous cherchez est introuvable. Excusez-nous pour la
              gène occasionnée.
            </p>
            <p className="fr-text--sm fr-mb-5w">
              Si vous avez tapé l&apos;adresse web dans le navigateur, vérifiez
              qu&apos;elle est correcte. La page n’est peut-être plus
              disponible.
              <br />
              Dans ce cas, pour continuer votre visite vous pouvez consulter
              notre page d’accueil.
            </p>
            <ul className="fr-btns-group fr-btns-group--inline-md">
              <li>
                <a className="fr-btn" href="/">
                  Page d&#39;accueil
                </a>
              </li>
            </ul>
          </div>
          <div className="fr-col-12 fr-col-md-3 fr-col-offset-md-1 fr-px-6w fr-px-md-0 fr-py-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fr-responsive-img fr-artwork"
              aria-hidden="true"
              width="160"
              height="200"
              viewBox="0 0 160 200"
            >
              <use
                className="fr-artwork-motif"
                href="/artwork/background/ovoid.svg#artwork-motif"
              ></use>
              <use
                className="fr-artwork-background"
                href="/artwork/background/ovoid.svg#artwork-background"
              ></use>
              <g transform="translate(40, 60)">
                <use
                  className="fr-artwork-decorative"
                  href="/artwork/pictograms/system/technical-error.svg#artwork-decorative"
                ></use>
                <use
                  className="fr-artwork-minor"
                  href="/artwork/pictograms/system/technical-error.svg#artwork-minor"
                ></use>
                <use
                  className="fr-artwork-major"
                  href="/artwork/pictograms/system/technical-error.svg#artwork-major"
                ></use>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AppNotFound
