import { getSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Verify } from '@mec/web/app/(public)/connexion/verification/Verify'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getUserAuthFlowStep } from '@mec/web/app/(public)/connexion/userAuthFlow'

const VerifyPage = async () => {
  const user = await getSessionUser()
  const nextStep = getUserAuthFlowStep(user)
  if (!user || nextStep !== '/connexion/login') {
    return redirect(nextStep)
  }

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <Verify />
    </>
  )
}

export default VerifyPage
