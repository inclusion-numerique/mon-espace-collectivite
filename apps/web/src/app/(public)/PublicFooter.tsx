import Link from 'next/link'
import Image from 'next/image'
import { PublicConfig } from '@mec/web/config'

const PublicFooter = () => {
  return (
    <footer id="footer" role="contentinfo" className="fr-footer">
      <div className="fr-container">
        <div className="fr-footer__body fr-footer__body--operator">
          <div className="fr-p-4v">
            <div className="fr-footer__brand fr-enlarge-link fr-p-4v">
              <a
                href="https://www.ecologie.gouv.fr/"
                title="Site Web du Ministère de la Transition écologique et de la Cohésion des territoires"
                className="fr-footer__brand-link"
              >
                <p className="fr-logo fr-logo--sm">
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
              </a>
            </div>
          </div>
          <div className="fr-p-4v">
            <div className="fr-footer__brand fr-enlarge-link fr-p-4v">
              <a
                href="https://agence-cohesion-territoires.gouv.fr/"
                title="Site Web de l'Agence Nationale de la Cohésion des Territoires"
                className="fr-footer__brand-link"
              >
                <picture>
                  <img
                    src="/images/logo-anct.svg"
                    alt="Logo de l'Agence Nationale de la Cohésion des Territoires"
                    width={200}
                    className="fr-footer__logo"
                  />
                </picture>
              </a>
            </div>
          </div>
          <div className="fr-footer__content">
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a
                  href="https://gouvernement.fr"
                  className="fr-footer__content-link"
                >
                  gouvernement.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  href="https://service-public.fr"
                  className="fr-footer__content-link"
                >
                  service-public.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  href="https://data.gouv.fr"
                  className="fr-footer__content-link"
                >
                  data.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  href="https://beta.gouv.fr"
                  className="fr-footer__content-link"
                >
                  beta.gouv.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            {/*<li className="fr-footer__bottom-item">*/}
            {/*  <a className="fr-footer__bottom-link" href="/data">*/}
            {/*    Données et API*/}
            {/*  </a>*/}
            {/*</li>*/}
            {/*<li className="fr-footer__bottom-item">*/}
            {/*  <a className="fr-footer__bottom-link" href="/contact">*/}
            {/*    Nous contacter*/}
            {/*  </a>*/}
            {/*</li>*/}
            {/*<li className="fr-footer__bottom-item">*/}
            {/*  <a className="fr-footer__bottom-link" href="/mentions-legales">*/}
            {/*    Mentions légales*/}
            {/*  </a>*/}
            {/*</li>*/}
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="/confidentialite">
                Politique de confidentialité
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <Link className="fr-footer__bottom-link" href="/accessibilite">
                Accessibilité : non conforme
              </Link>
            </li>
            <li className="fr-footer__bottom-item">
              <a
                className="fr-footer__bottom-link"
                href={PublicConfig.repository}
                target="_blank"
                rel="noreferrer"
                title="Code source"
              >
                Code source
              </a>
            </li>
          </ul>
        </div>
        <div className="fr-footer__bottom-copy">
          <p>
            Sauf mention contraire, tous les contenus de ce site sont sous{' '}
            <a
              href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
              target="_blank"
              rel="noreferrer"
            >
              licence etalab-2.0
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default PublicFooter
