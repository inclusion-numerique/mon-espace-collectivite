import { LegacyProject } from '@prisma/client'
import {
  legacyProjectImageUrl,
  legacyProjectUrl,
} from '@mec/web/projethoteque/legacyProjects'
import styles from '@mec/web/app/(public)/projets/styles.module.css'
import Link from 'next/link'
import { CSSProperties, ForwardedRef, forwardRef } from 'react'

export const LegacyProjectCard = forwardRef(
  (
    {
      style,
      project: {
        program,
        categories,
        district,
        id,
        title,
        city,
        imageAlt,
        imagePath,
        itemIndexInPage,
        pageIndex,
        slug,
      },
    }: {
      style?: CSSProperties
      project: LegacyProject
    },
    ref: ForwardedRef<HTMLLIElement>,
  ) => {
    return (
      <li style={style} ref={ref}>
        <Link
          href={legacyProjectUrl(slug)}
          target="_blank"
          rel="noreferrer"
          className={`fr-p-4v fr-mb-8v ${styles.legacyProjectCard}`}
        >
          <picture>
            <img
              id={`${id}__image`}
              src={legacyProjectImageUrl(imagePath)}
              alt={imageAlt}
            />
          </picture>
          <div className="fr-col-8 fr-pl-4v">
            <h6 className="fr-mb-2v fr-text--lg">{title}</h6>
            <div>
              <p className="fr-mb-2v">
                <span className="fr-icon-map-pin-2-line fr-mr-1v" />
                {city}
              </p>
            </div>
            <div>
              {district ? (
                <p className="fr-badge fr-badge--sm fr-badge--info fr-badge--no-icon fr-mr-2v fr-mt-2v">
                  {district}
                </p>
              ) : null}
              {program ? (
                <p className="fr-badge fr-badge--sm fr-mt-2v">{program}</p>
              ) : null}
            </div>
            <div>
              {categories.map((category) => (
                <p
                  key={category}
                  className="fr-badge fr-badge--sm fr-badge--green-emeraude fr-mr-2v fr-mt-2v"
                >
                  {category}
                </p>
              ))}
            </div>
          </div>
        </Link>
      </li>
    )
  },
)
LegacyProjectCard.displayName = 'LegacyProjectCard'
