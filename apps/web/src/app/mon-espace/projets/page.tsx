import { prismaClient } from '@mec/web/prismaClient'
import { UnauthorizedError } from '@mec/web/app/ServerError'
import { getAuthenticatedSessionUser } from '@mec/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Routes } from '@mec/web/app/routing'

const ProjectsIndexPage = async () => {
  const user = await getAuthenticatedSessionUser()

  // If the user is administrator, he can stay on an empty index and change the scope with the ProjectListForm from projects layout
  if (user.roles.includes('Administrator')) {
    return null
  }

  // Else we check the access levels of the user and redirect to correct scope
  const userWithAccessLevels = await prismaClient.user.findUnique({
    where: { id: user.id },
    include: {
      countyAccessLevels: true,
      districtAccessLevels: true,
      intercommunalityAccessLevels: true,
      municipalityAccessLevels: true,
    },
    rejectOnNotFound: true,
  })

  const countyAccessLevel = userWithAccessLevels.countyAccessLevels[0]
  if (countyAccessLevel) {
    redirect(
      Routes.MonEspace.Projets.Scale.Code({
        scale: 'prefecture',
        code: countyAccessLevel.countyCode,
      }),
    )
  }

  const districtAccessLevel = userWithAccessLevels.districtAccessLevels[0]
  if (districtAccessLevel) {
    redirect(
      Routes.MonEspace.Projets.Scale.Code({
        scale: 'sous-prefecture',
        code: districtAccessLevel.districtCode,
      }),
    )
  }

  const intercommunalityAccessLevel =
    userWithAccessLevels.intercommunalityAccessLevels[0]
  if (intercommunalityAccessLevel) {
    redirect(
      Routes.MonEspace.Projets.Scale.Code({
        scale: 'epci',
        code: intercommunalityAccessLevel.intercommunalityCode,
      }),
    )
  }

  const municipalityAccessLevel =
    userWithAccessLevels.municipalityAccessLevels[0]
  if (municipalityAccessLevel) {
    redirect(
      Routes.MonEspace.Projets.Scale.Code({
        scale: 'municipalite',
        code: municipalityAccessLevel.municipalityCode,
      }),
    )
  }

  return <UnauthorizedError />
}

export default ProjectsIndexPage
