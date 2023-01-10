import { getSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Verify } from '@mec/web/app/(public)/connexion/verification/Verify'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { Routes } from '@mec/web/app/routing'

const VerifyPage = async () => {
  const user = await getSessionUser()
  if (user) {
    redirect(Routes.MonEspace.Index)
    return null
  }

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <Verify />
    </>
  )
}

export default VerifyPage
