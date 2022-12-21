import { getAuthenticatedSessionUser } from '@mec/web/auth/getSessionUser'
import { PrefectureDashboard } from '@mec/web/app/mon-espace/(prefecture)/PrefectureDashboard'
import { MunicipalityDashboard } from '@mec/web/app/mon-espace/(municipality)/MunicipalityDashboard'
import { SubPrefectureDashboard } from '@mec/web/app/mon-espace/(sub-prefecture)/SubPrefectureDashboard'
import { IntercommunalityDashboard } from '@mec/web/app/mon-espace/(intercommunality)/IntercommunalityDashboard'
import { prismaClient } from '@mec/web/prismaClient'

const DashboardPage = async () => {
  const user = await getAuthenticatedSessionUser()

  if (user.roles.includes('Administrator')) {
    return (
      <div className="fr-container">
        <h3>🚧 espace administrateur en construction 🚧</h3>
      </div>
    )
  }

  if (user.roles.includes('Prefecture')) {
    const accessLevel = await prismaClient.countyAccessLevel.findFirst({
      where: { userId: user.id },
      include: { county: true },
    })
    if (!accessLevel) {
      // User has no access to any scope for his role
      throw new Error('User has no access to any scope')
    }
    return <PrefectureDashboard user={user} county={accessLevel.county} />
  }

  if (user.roles.includes('SubPrefecture')) {
    const accessLevel = await prismaClient.districtAccessLevel.findFirst({
      where: { userId: user.id },
      include: { district: true },
    })
    if (!accessLevel) {
      // User has no access to any scope for his role
      throw new Error('User has no access to any scope')
    }
    return (
      <SubPrefectureDashboard user={user} district={accessLevel.district} />
    )
  }

  if (user.roles.includes('Intercommunality')) {
    const accessLevel =
      await prismaClient.intercommunalityAccessLevel.findFirst({
        where: { userId: user.id },
        include: { intercommunality: { include: { crte: true } } },
      })
    if (!accessLevel) {
      // User has no access to any scope for his role
      throw new Error('User has no access to any scope')
    }
    return (
      <IntercommunalityDashboard
        user={user}
        intercommunality={accessLevel.intercommunality}
        crte={accessLevel.intercommunality.crte}
      />
    )
  }

  if (user.roles.includes('Municipality')) {
    const accessLevel = await prismaClient.municipalityAccessLevel.findFirst({
      where: { userId: user.id },
      include: {
        municipality: {
          include: { intercommunality: { include: { crte: true } } },
        },
      },
    })
    if (!accessLevel) {
      // User has no access to any scope for his role
      throw new Error('User has no access to any scope')
    }
    return (
      <MunicipalityDashboard
        user={user}
        municipality={accessLevel.municipality}
        crte={accessLevel.municipality.intercommunality.crte}
      />
    )
  }

  throw new Error('No dashboard available for this user. Missing roles.')
}
export default DashboardPage
