'use client'
import styles from '@mec/web/app/(public)/projets/styles.module.css'
import {
  useCategoriesFilters,
  useDistrictFilters,
} from '@mec/web/app/(public)/projets/projectFiltersStore'
import { trpc } from '@mec/web/trpc'
import { withTrpc } from '@mec/web/withTrpc'
import {
  ProjectCards,
  ProjectCardsWithAnimation,
} from '@mec/web/app/(public)/projets/ProjectCards'
import { Spinner } from '@mec/web/ui/Spinner'
import { useInView } from 'react-intersection-observer'
import { ProjectListCta } from '@mec/web/app/(public)/projets/ProjectListCta'

const ProjectsList = ({}: {}) => {
  const selectedDistricts = useDistrictFilters(({ selected }) => selected)
  const selectedCategories = useCategoriesFilters(({ selected }) => selected)

  const projectsQuery = trpc.findLegacyProject.useInfiniteQuery(
    {
      limit: 10,
      districts: [...selectedDistricts],
      categories: [...selectedCategories],
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true,
    },
  )

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && projectsQuery.hasNextPage) {
        projectsQuery.fetchNextPage()
      }
    },
  })

  const pages = projectsQuery.data?.pages
  const totalCount = pages ? pages[0].count : null

  if (projectsQuery.isError) {
    return (
      <div
        className={`fr-p-4v fr-mt-2v`}
        style={{
          textAlign: 'center',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p style={{ width: '100%', fontWeight: 500 }}>
          <span className="fr-icon-error-line fr-mr-2v" />
          Une erreur est survenue lors du chargement des projets,
          <br /> merci de réessayer ultérieurement.
        </p>
      </div>
    )
  }

  if (projectsQuery.isLoading) {
    return (
      <div
        className="fr-mt-4v"
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Spinner />
      </div>
    )
  }

  if (totalCount === 0) {
    return (
      <>
        <div
          className={`fr-p-4v ${styles.legacyProjectCard}`}
          style={{
            textAlign: 'center',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p
            style={{ width: '100%', fontWeight: 500 }}
            className="fr-mb-0 fr-mt-4v"
          >
            <span className="fr-icon-search-line fr-mr-2v" /> Il n&apos;y a pas
            encore de projets pour votre recherche.
          </p>
        </div>
        <ul className="fr-raw-list">
          <ProjectListCta />
        </ul>
      </>
    )
  }

  return (
    <>
      <div
        className="fr-mt-2v"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {projectsQuery.isFetching ? (
          <Spinner size="sm" />
        ) : (
          <p style={{ fontWeight: 400, fontSize: '.875rem', marginBottom: 0 }}>
            {totalCount === 1
              ? `1 projet correspond à votre recherche`
              : `${totalCount} projets correspondent à votre recherche`}
          </p>
        )}
      </div>
      <ul className="fr-raw-list fr-mt-8v">
        {pages?.map((page, i) => (
          <>
            {i === 0 ? (
              <ProjectCardsWithAnimation
                key={`${i}_${page.nextCursor}`}
                projects={page.projects}
                displayCta={!page.nextCursor}
              />
            ) : (
              <ProjectCards
                key={`${i}_${page.nextCursor}`}
                projects={page.projects}
                displayCta={!page.nextCursor}
              />
            )}
          </>
        ))}
      </ul>
      {projectsQuery.hasNextPage ? (
        <div
          className="fr-mt-4v"
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Spinner />
          <div
            ref={ref}
            style={{
              width: '0',
              height: '800px',
              position: 'absolute',
              top: '-800px',
              left: 0,
            }}
          />
        </div>
      ) : null}
    </>
  )
}

export default withTrpc(ProjectsList)
