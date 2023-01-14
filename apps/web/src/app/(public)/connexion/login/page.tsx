import { getSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Signin } from '@mec/web/app/(public)/connexion/login/Signin'
import { Breadcrumbs } from '@mec/web/ui/Breadcrumbs'
import { Routes } from '@mec/web/app/routing'

const SigninPage = async ({
  searchParams: { error } = {},
}: {
  searchParams?: { error?: string }
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(Routes.MonEspace.Index)
    return null
  }

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <Signin error={error} />
    </>
  )
}

export default SigninPage
