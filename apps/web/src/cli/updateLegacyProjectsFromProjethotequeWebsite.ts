import { listProjects } from '@mec/web/projethoteque/scrapper'
import { prismaClient } from '@mec/web/prisma'

const updateLegacyProjectsFromProjethotequeWebsite = async () => {
  console.log('👓 Fetching projects from anct website')
  const projectsList = await listProjects()
  console.log(`📁 Found ${projectsList.projectItems.length} projects`)
  if (projectsList.projectItems.length < 90) {
    throw new Error(
      'Seems like there is not enough projects found. Aborting to prevent deletion.',
    )
  }
  console.log('💾 Updating database')
  await prismaClient.$transaction([
    prismaClient.legacyProject.deleteMany(),
    prismaClient.legacyProject.createMany({
      skipDuplicates: false,
      data: projectsList.projectItems,
    }),
  ])

  console.log(
    `👍 The ${projectsList.projectItems.length} projects have been saved in database`,
  )
}

updateLegacyProjectsFromProjethotequeWebsite()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
