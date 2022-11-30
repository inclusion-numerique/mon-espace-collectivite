import Link from 'next/link'
import styles from '@mec/web/app/(public)/styles.module.css'
import { categories, categoryProjectsLink } from '@mec/web/anctProjects'
import { overlayedImageBackground } from '@mec/web/styles/styles'

export default function HomePage() {
  return (
    <>
      <div
        className={styles.cover}
        style={{
          backgroundImage: overlayedImageBackground,
        }}
      >
        <div className="fr-container fr-py-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
              <h1 className={`fr-display--sm ${styles.jumboText}`}>
                Mon espace collectivité
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-container fr-py-6w">
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
            <div
              className={`fr-background-default--grey fr-p-6w ${styles.jumboCard}`}
            >
              <p className="fr-text--lead">
                «
                <strong>
                  La transition écologique est le défi majeur pour notre pays.
                </strong>{' '}
                Les collectivités territoriales sont en première ligne pour y
                faire face. Le partage de solutions concrètes, des réussites
                faites ici ou là, est indispensable pour accélération la
                transition écologique de nos territoires. Ensemble, partageons
                les solutions. »
              </p>
              <p
                className="fr-text--lead fr-mb-2v"
                style={{ textAlign: 'right' }}
              >
                Christophe Béchu
              </p>
              <p className="fr-text fr-mb-0" style={{ textAlign: 'right' }}>
                Ministre de la Transition écologique <br />
                et de la Cohésion des territoires
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-py-4v">
        <div className="fr-container">
          <div className="fr-grid-row fr-mt-1v fr-mb-8v fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-btns-group fr-btns-group--lg">
                <Link
                  href="/projet"
                  className="fr-btn fr-py-8v"
                  style={{ textAlign: 'center' }}
                >
                  Je suis maire ou président d&apos;intercommunalité,
                  <br />
                  je partage mes solutions&nbsp;!
                </Link>
              </div>
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-btns-group fr-btns-group--lg">
                <Link
                  href="/projets"
                  className="fr-btn fr-btn--secondary fr-py-8v"
                  style={{ textAlign: 'center' }}
                >
                  Je suis maire ou président d&apos;intercommunalité, <br />
                  je cherche des solutions&nbsp;!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-background-alt--blue-france">
        <div className="fr-container fr-py-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <h2>Découvrez des solutions partout en France</h2>
            </div>
            {categories.map((category) => (
              <div key={category} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <div className="fr-tile fr-tile--horizontal fr-enlarge-link">
                  <div className="fr-tile__body fr-m-4v">
                    <h4 className="fr-tile__title fr-mb-0">
                      <Link href={categoryProjectsLink(category)}>
                        {category}
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="fr-container fr-pt-6w fr-pb-10w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <h2>Questions fréquentes</h2>
            </div>
            <div
              className="fr-accordions-group"
              data-fr-js-accordions-group="true"
              style={{ width: '100%' }}
            >
              <section className="fr-accordion">
                <h3 className="fr-accordion__title">
                  <button
                    className="fr-accordion__btn"
                    aria-expanded="false"
                    aria-controls="accordion-1"
                    data-fr-js-collapse-button="true"
                  >
                    Quel type de projets puis-je partager sur cette
                    plateforme&nbsp;?
                  </button>
                </h3>
                <div
                  className="fr-collapse"
                  id="accordion-1"
                  data-fr-js-collapse="true"
                >
                  <p>
                    À priori, toutes les thématiques sont couvertes. L’idée est
                    de montrer une solution innovante de par sa conception, sa
                    mise en œuvre ou encore ses parties prenantes.
                  </p>
                  <p>
                    Si vous avec une solution à fort impact sur votre territoire
                    et que vous pensez qu’elle peut se répliquer, cette
                    plateforme est l’endroit idéal pour la partager.
                  </p>
                </div>
              </section>
              <section className="fr-accordion">
                <h3 className="fr-accordion__title">
                  <button
                    className="fr-accordion__btn"
                    aria-expanded="false"
                    aria-controls="accordion-2"
                    data-fr-js-collapse-button="true"
                  >
                    Et si j’ai un projet et non une solution&nbsp;?
                  </button>
                </h3>
                <div
                  className="fr-collapse"
                  id="accordion-2"
                  data-fr-js-collapse="true"
                >
                  <p>
                    Si vous avez un projet, la projetothèque est là pour vous
                    inspirer et, pourquoi pas, en améliorer un ou plusieurs
                    aspects.
                  </p>
                  <p>
                    Si votre souhait est d’avoir connaissance des offres
                    d’ingénierie ou de financement, le site du Ministère
                    Aides-territoires (
                    <a
                      href="https://aides-territoires.beta.gouv.fr"
                      target="_blank"
                      rel="noreferrer"
                      className="fr-link"
                    >
                      https://aides-territoires.beta.gouv.fr
                    </a>
                    ) est l’endroit idéal.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
