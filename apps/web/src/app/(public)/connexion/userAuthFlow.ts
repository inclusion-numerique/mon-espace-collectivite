import { SessionUser } from '@mec/web/auth/sessionUser'
import { dashboardRootPath } from '@mec/web/dashboard/dashboard'

export const getUserAuthFlowStep = (user: SessionUser | null) => {
  if (!user) {
    return '/connexion/login' as const
  }

  if (user.status !== 'Active') {
    return '/connexion/en-attente' as const
  }

  if (!user.onboarded) {
    return '/connexion/onboarding' as const
  }

  return dashboardRootPath
}
