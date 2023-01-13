import { getAuthenticatedSessionUser } from '@mec/web/auth/getSessionUser'
import {
  projectScopeLabels,
  reverseUrlProjectScopes,
  UrlProjectScope,
} from '@mec/web/project/project'
import { userIsAdmin } from '@mec/web/utils/user'
import { notFound } from 'next/navigation'
import { PrefectureDashboard } from '@mec/web/app/mon-espace/(prefecture)/PrefectureDashboard'
import { prismaClient } from '@mec/web/prismaClient'
import { SubPrefectureDashboard } from '@mec/web/app/mon-espace/(sub-prefecture)/SubPrefectureDashboard'
import { IntercommunalityDashboard } from '@mec/web/app/mon-espace/(intercommunality)/IntercommunalityDashboard'
import { MunicipalityDashboard } from '@mec/web/app/mon-espace/(municipality)/MunicipalityDashboard'

const ProjectsDashboardPage = async ({
  params,
}: {
  params: { scope: UrlProjectScope; perimeter: string }
}) => {
  await new Promise((res) => setTimeout(res, 2000))
  const scope = reverseUrlProjectScopes[params.scope]
  const perimeter = decodeURIComponent(params.perimeter)
  // Validate that the scope is valid
  if (!scope) {
    notFound()
    return null
  }
  const user = await getAuthenticatedSessionUser()
  const isAdmin = userIsAdmin(user)

  const where = isAdmin
    ? // Admin has access to all scopes and perimeters by name
      { OR: [{ code: perimeter }, { name: perimeter }] }
    : // Users have to have an access level for this perimeter
      { code: perimeter, accessLevels: { some: { userId: user.id } } }

  if (scope === 'county') {
    const county = await prismaClient.county.findFirst({
      where,
    })
    if (county) {
      return <PrefectureDashboard user={user} county={county} />
    }
  }

  if (scope === 'district') {
    const district = await prismaClient.district.findFirst({
      where,
    })
    if (district) {
      return <SubPrefectureDashboard user={user} district={district} />
    }
  }

  if (scope === 'intercommunality') {
    const intercommunality = await prismaClient.intercommunality.findFirst({
      where,
      include: {
        crte: true,
      },
    })
    if (intercommunality) {
      return (
        <IntercommunalityDashboard
          user={user}
          intercommunality={intercommunality}
          crte={intercommunality.crte}
        />
      )
    }
  }

  if (scope === 'municipality') {
    const municipality = await prismaClient.municipality.findFirst({
      where,
      include: {
        intercommunality: {
          include: {
            crte: true,
          },
        },
      },
    })
    if (municipality) {
      return (
        <MunicipalityDashboard
          user={user}
          municipality={municipality}
          crte={municipality.intercommunality.crte}
        />
      )
    }
  }

  if (isAdmin) {
    // There was no result for this scope/perimeter combination
    // Admins can search perimeters with the name of the place instead of the code
    return (
      <div className="fr-container">
        <div className="fr-alert fr-alert--info fr-mb-6v">
          <h3 className="fr-alert__title">
            {projectScopeLabels[scope]} &#34;{perimeter}&#34; introuvable.
          </h3>
          <p>
            Veuillez vérifier que &#34;{perimeter}&#34; est un code INSEE valide
            ou le nom exact du territoire que vous recherchez.
          </p>
        </div>
      </div>
    )
  }

  notFound()
  return null
}

export default ProjectsDashboardPage
