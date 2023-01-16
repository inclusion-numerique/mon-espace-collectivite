import Link from 'next/link'
import { Routes } from '@mec/web/app/routing'

export const PublicHeaderNav = () => {
  return (
    <ul className="fr-nav__list">
      <li className="fr-nav__item">
        <Link className="fr-nav__link" href={Routes.MonEspace.Index}>
          Gérer et voir mes CRTE
        </Link>
      </li>
      <li className="fr-nav__item">
        <a
          className="fr-nav__link"
          href="https://solutionsdelus.anct.gouv.fr"
          target="_blank"
          rel="noreferrer"
        >
          Solutions d&apos;élus
        </a>
      </li>
      <li className="fr-nav__item">
        <Link
          className="fr-nav__link"
          href={Routes.MonEspace.Indicateurs.Index}
        >
          Indicateurs des collectivités
        </Link>
      </li>
    </ul>
  )
}
