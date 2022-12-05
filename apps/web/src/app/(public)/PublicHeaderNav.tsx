import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { dashboardRootPath } from '@mec/web/dashboard/dashboard'

export const PublicHeaderNav = () => {
  return (
    <ul className="fr-nav__list">
      <li className="fr-nav__item">
        <Link className="fr-nav__link" href={dashboardRootPath}>
          Gérer et voir mes CRTE
        </Link>
      </li>
      <li className="fr-nav__item">
        <a
          className="fr-nav__link"
          href="https://lafrancedessolutions.gouv.fr"
          target="_blank"
          rel="noreferrer"
        >
          La France des solutions
        </a>
      </li>
      <li className="fr-nav__item">
        {/*TODO link to stats*/}
        <Link className="fr-nav__link" href={dashboardRootPath}>
          Indicateurs des collectivités
        </Link>
      </li>
    </ul>
  )
}
