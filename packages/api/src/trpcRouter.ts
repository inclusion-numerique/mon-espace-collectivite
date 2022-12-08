import { ProjectDataValidation } from '@mec/web/project/project'
import { prisma } from '@mec/db'
import { v4 } from 'uuid'
import z from 'zod'
import { searchCommunity } from '@mec/web/siren/siren'
import { protectedProcedure, router } from './trpc'
import { generateReference } from '@mec/web/project/generateReference'

const userRouter = router({
  acknowledgeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    await prisma.user.update({
      where: { id: ctx.user.id },
      data: { onboarded: new Date() },
    })
  }),
})

const communityRouter = router({
  search: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(20).optional(),
        offset: z.number().min(1).optional(),
      }),
    )
    .query(async ({ input: { query, offset, limit = 20 } }) => {
      return searchCommunity(query)
    }),
})

const projectRouter = router({
  create: protectedProcedure
    .input(ProjectDataValidation)
    .mutation(async ({ input: { communityId, ...data }, ctx: { user } }) => {
      // TODO Check rights / role for user on community project creation
      const id = v4()
      const reference = generateReference()
      const project = await prisma.project.create({
        data: {
          id,
          reference,
          communityId,
          createdById: user.id,
          ...data,
        },
        include: { attachments: true, community: true },
      })

      return { project }
    }),
  update: protectedProcedure
    .input(ProjectDataValidation.extend({ id: z.string().uuid() }))
    .mutation(
      async ({ input: { id, communityId, ...data }, ctx: { user } }) => {
        // TODO Check rights / role for user on community project creation
        // TODO Check right on write on this project
        const project = await prisma.project.update({
          where: { id },
          data: {
            id,
            updated: new Date(),
            ...data,
          },
          include: { attachments: true, community: true },
        })

        return { project }
      },
    ),
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input: { id }, ctx: { user } }) => {
      // TODO Check rights / role for user on community project creation
      // TODO Check right on write on this project
      const project = await prisma.project.delete({
        where: { id },
      })

      return { project }
    }),
})

export const appRouter = router({
  user: userRouter,
  project: projectRouter,
  community: communityRouter,
})

export type AppRouter = typeof appRouter
