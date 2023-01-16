import { getAuthenticatedSessionUser } from '@mec/web/auth/getSessionUser'
import { isUserAdmin } from '@mec/web/utils/user'
import { notFound } from 'next/navigation'
import { PrefectureProjects } from '@mec/web/app/mon-espace/(prefecture)/PrefectureProjects'
import { SubPrefectureProjects } from '@mec/web/app/mon-espace/(sub-prefecture)/SubPrefectureProjects'
import { IntercommunalityProjects } from '@mec/web/app/mon-espace/(intercommunality)/IntercommunalityProjects'
import { MunicipalityProjects } from '@mec/web/app/mon-espace/(municipality)/MunicipalityProjects'
import { getAuthorizedCommunity } from '@mec/web/app/mon-espace/projets/[scale]/[code]/getPerimeter'
import { reverseUrlScales, scaleLabels, Scope, UrlScale } from '@mec/web/scope'

export const revalidate = 0

const ProjectsDashboardPage = async ({
  params,
}: {
  params: { scale: UrlScale; code: string }
}) => {
  const scale = reverseUrlScales[params.scale]
  const code = decodeURIComponent(params.code)
  // Validate that the scope is valid
  if (!scale || !code) {
    notFound()
    return null
  }
  const scope: Scope = { scale, code }

  const user = await getAuthenticatedSessionUser()
  const isAdmin = isUserAdmin(user)

  const authorizedCommunity = await getAuthorizedCommunity({
    user,
    scope,
  })

  if (authorizedCommunity?.county) {
    return <PrefectureProjects county={authorizedCommunity.county} />
  }

  if (authorizedCommunity?.district) {
    return <SubPrefectureProjects district={authorizedCommunity.district} />
  }

  if (authorizedCommunity?.intercommunality) {
    return (
      <IntercommunalityProjects
        intercommunality={authorizedCommunity.intercommunality}
        crte={authorizedCommunity.intercommunality.crte}
      />
    )
  }

  if (authorizedCommunity?.municipality) {
    return (
      <MunicipalityProjects
        municipality={authorizedCommunity.municipality}
        crte={authorizedCommunity.municipality.intercommunality.crte}
      />
    )
  }

  // No authorized perimeter, show not found error or detailed error message for admins

  if (isAdmin) {
    // There was no result for this scope
    // Admins can search perimeters with the name of the place instead of the code
    return (
      <div className="fr-container">
        <div className="fr-alert fr-alert--info fr-mb-6v">
          <h3 className="fr-alert__title">
            {scaleLabels[scale]} &#34;{code}&#34; introuvable.
          </h3>
          <p>
            Veuillez vérifier que &#34;{code}&#34; est un code INSEE valide ou
            le nom exact du territoire que vous recherchez.
          </p>
        </div>
      </div>
    )
  }

  notFound()
  return null
}

export default ProjectsDashboardPage
