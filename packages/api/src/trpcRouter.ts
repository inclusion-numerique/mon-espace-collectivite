import { ProjectDataValidation } from '@mec/web/project/project'
import { prisma } from '@mec/db'
import { v4 } from 'uuid'
import z from 'zod'
import { searchCommunity } from '@mec/web/siren/siren'
import { protectedProcedure, router } from './trpc'

const userRouter = router({
  acknowledgeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    await prisma.user.update({
      where: { id: ctx.user.id },
      data: { onboarded: new Date() },
    })
  }),
})

const communityRouter = router({
  searchCommunity: protectedProcedure
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
  createProject: protectedProcedure
    .input(ProjectDataValidation)
    .mutation(
      async ({
        input: {
          reference,
          community,
          quality,
          name,
          description,
          domain,
          email,
          partners,
          phone,
          tech,
          solution,
          dates,
          attachments,
        },
      }) => {
        const id = v4()
        // const project = await prisma.project.create({
        //   data: {
        //     id,
        //     reference,
        //     community: {
        //       connectOrCreate: {
        //         where: { id: community.id },
        //         create: { ...community, zipcodes: community.zipcodes ?? [] },
        //       },
        //     },
        //     quality,
        //     name,
        //     description,
        //     domain,
        //     email,
        //     partners,
        //     phone,
        //     tech,
        //     solution,
        //     dates,
        //     attachments: { createMany: { data: attachments } },
        //   },
        //   include: { attachments: true, community: true },
        // })
        //
        // return { project }
      },
    ),
})

export const appRouter = router({
  user: userRouter,
  project: projectRouter,
  community: communityRouter,
})

export type AppRouter = typeof appRouter
