import { getSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Signin } from '@mec/web/app/(public)/connexion/login/Signin'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getUserAuthFlowStep } from '@mec/web/app/(public)/connexion/userAuthFlow'

const SigninPage = async ({
  searchParams: { error } = {},
}: {
  searchParams?: { error?: string }
}) => {
  const user = await getSessionUser()
  const nextStep = getUserAuthFlowStep(user)
  if (nextStep !== '/connexion/login') {
    return redirect(nextStep)
  }

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <Signin error={error} />
    </>
  )
}

export default SigninPage
