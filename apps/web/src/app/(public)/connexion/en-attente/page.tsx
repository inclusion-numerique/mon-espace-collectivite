import { getSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Pending } from '@mec/web/app/(public)/connexion/en-attente/Pending'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { getUserAuthFlowStep } from '@mec/web/app/(public)/connexion/userAuthFlow'

const PendingPage = async () => {
  const user = await getSessionUser()
  const nextStep = getUserAuthFlowStep(user)
  if (nextStep !== '/connexion/en-attente') {
    return redirect(nextStep)
  }

  return (
    <>
      <Breadcrumbs currentPage="Création de compte" />
      <Pending />
    </>
  )
}

export default PendingPage
