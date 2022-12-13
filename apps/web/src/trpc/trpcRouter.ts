import { ProjectDataValidation } from '@mec/web/project/project'
import { prismaClient } from '@mec/web/prismaClient'
import { v4 } from 'uuid'
import z from 'zod'
import { searchCommunity } from '@mec/web/siren/siren'
import { protectedProcedure, router } from './trpc'
import { generateReference } from '@mec/web/project/generateReference'
import { ProjectNoteDataValidation } from '@mec/web/project/projectNote'

const userRouter = router({
  acknowledgeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    await prismaClient.user.update({
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
    .mutation(
      async ({
        input: { municipalityCode, secondaryCategoryIds, ...data },
        ctx: { user },
      }) => {
        // TODO Check rights / role for user on community project creation
        const id = v4()
        const reference = generateReference()
        const project = await prismaClient.project.create({
          data: {
            id,
            reference,
            municipalityCode,
            createdById: user.id,
            secondaryCategories: {
              connect: secondaryCategoryIds.map((id) => ({ id })),
            },
            ...data,
          },
          include: { attachments: true, municipality: true },
        })

        return { project }
      },
    ),
  update: protectedProcedure
    .input(ProjectDataValidation.extend({ id: z.string().uuid() }))
    .mutation(
      async ({
        input: { id, municipalityCode, secondaryCategoryIds, ...data },
        ctx: { user },
      }) => {
        // TODO Check rights / role for user on community project creation
        // TODO Check right on write on this project
        const project = await prismaClient.project.update({
          where: { id },
          data: {
            id,
            updated: new Date(),
            municipalityCode,
            secondaryCategories: {
              connect: secondaryCategoryIds.map((id) => ({ id })),
            },
            ...data,
          },
          include: { attachments: true, municipality: true },
        })

        return { project }
      },
    ),
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input: { id }, ctx: { user } }) => {
      // TODO Check rights / role for user on community project creation
      // TODO Check right on write on this project
      const project = await prismaClient.project.delete({
        where: { id },
      })

      return { project }
    }),
  createNote: protectedProcedure
    .input(ProjectNoteDataValidation)
    .mutation(async ({ input: { ...data }, ctx: { user } }) => {
      // TODO Check rights / role for user on  project note creation
      const id = v4()
      const projectNote = await prismaClient.projectNote.create({
        data: {
          id,
          createdById: user.id,
          ...data,
        },
      })

      return { projectNote }
    }),
  updateNote: protectedProcedure
    .input(ProjectNoteDataValidation.extend({ id: z.string().uuid() }))
    .mutation(async ({ input: { id, ...data }, ctx: { user } }) => {
      // TODO Check rights / role for user on community projectNote update
      // TODO Check right on write on this projectNote
      const projectNote = await prismaClient.projectNote.update({
        where: { id },
        data: {
          id,
          updated: new Date(),
          ...data,
        },
      })

      return { projectNote }
    }),
  deleteNote: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input: { id }, ctx: { user } }) => {
      // TODO Check rights / role for user on community projectNote deletion
      // TODO Check right on write on this projectNote
      const projectNote = await prismaClient.projectNote.delete({
        where: { id },
      })

      return { projectNote }
    }),
})

export const appRouter = router({
  user: userRouter,
  project: projectRouter,
  community: communityRouter,
})

export type AppRouter = typeof appRouter
