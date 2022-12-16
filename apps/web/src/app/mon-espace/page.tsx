import { getAuthenticatedSessionUser } from '@mec/web/auth/getSessionUser'
import { PrefectureDashboard } from '@mec/web/app/mon-espace/(prefecture)/PrefectureDashboard'
import { MunicipalityDashboard } from '@mec/web/app/mon-espace/(municipality)/MunicipalityDashboard'
import { SubPrefectureDashboard } from '@mec/web/app/mon-espace/(sub-prefecture)/SubPrefectureDashboard'

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
    return <PrefectureDashboard user={user} />
  }

  if (user.roles.includes('SubPrefecture')) {
    return <SubPrefectureDashboard user={user} />
  }

  if (user.roles.includes('Municipality')) {
    return <MunicipalityDashboard user={user} />
  }

  throw new Error('No dashboard available for this user. Missing roles.')
}
export default DashboardPage
