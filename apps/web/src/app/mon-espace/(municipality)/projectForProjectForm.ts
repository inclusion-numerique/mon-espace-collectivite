import { prismaClient } from '@mec/web/prismaClient'

export const getProjectForProjectForm = (reference: string) =>
  prismaClient.project.findFirst({
    where: {
      reference,
    },
    include: {
      municipality: true,
      intercommunality: true,
      category: { include: { theme: true } },
      secondaryCategories: { include: { theme: true } },
      attachments: true,
    },
  })

export type ProjectForProjectForm = Exclude<
  Awaited<ReturnType<typeof getProjectForProjectForm>>,
  null
>
