import { getSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Onboarding } from '@mec/web/app/(public)/connexion/onboarding/Onboarding'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getUserAuthFlowStep } from '@mec/web/app/(public)/connexion/userAuthFlow'
import { getUserDisplayName, getUserFullDisplayRole } from '@mec/web/utils/user'
import { AuthCard } from '@mec/web/app/(public)/connexion/AuthCard'

const OnboardingPage = async ({}: {}) => {
  const user = await getSessionUser()
  const nextStep = getUserAuthFlowStep(user)
  if (!user || nextStep !== '/connexion/onboarding') {
    return redirect(nextStep)
  }

  return (
    <>
      <Breadcrumbs currentPage="Création de compte" />
      <AuthCard>
        <Onboarding
          name={getUserDisplayName(user)}
          role={getUserFullDisplayRole(user)}
        />
      </AuthCard>
    </>
  )
}

export default OnboardingPage
