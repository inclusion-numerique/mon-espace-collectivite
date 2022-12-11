import { getAuthenticatedSessionUser } from '@mec/web/auth/getSessionUser'
import { CommunityDashboard } from '@mec/web/app/mon-espace/(municipality)/CommunityDashboard'
import { userHasSomeRole } from '@mec/web/utils/user'
import { PrefectureDashboard } from '@mec/web/app/mon-espace/(prefecture)/PrefectureDashboard'

const DashboardPage = async () => {
  const user = await getAuthenticatedSessionUser()

  if (userHasSomeRole(user, ['Prefecture', 'SubPrefecture', 'Administrator'])) {
    return <PrefectureDashboard user={user} />
  }

  return <CommunityDashboard user={user} />
}
export default DashboardPage
