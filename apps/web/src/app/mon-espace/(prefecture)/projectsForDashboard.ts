import { prismaClient } from '@mec/web/prismaClient'

export const getProjectsForDashboard = (userId: string) =>
  prismaClient.project.findMany({
    where: {
      municipality: {
        // Check has access to district or county
        OR: [
          { district: { accessLevels: { some: { userId } } } },
          {
            district: {
              county: { accessLevels: { some: { userId } } },
            },
          },
        ],
      },
    },
    include: {
      attachments: true,
      municipality: {
        include: {
          intercommunality: { include: { crte: true } },
        },
      },
      intercommunality: { include: { crte: true } },
      category: { include: { theme: true } },
      secondaryCategories: { include: { theme: true } },
      notes: { where: { createdById: userId } },
    },
    orderBy: { created: 'desc' },
  })

export type ProjectsForDashboard = Awaited<
  ReturnType<typeof getProjectsForDashboard>
>

export type ProjectForDashboard = ProjectsForDashboard[number]
