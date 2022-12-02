import { initTRPC, TRPCError } from '@trpc/server'
import { AppContext } from '@mec/api'
import { SessionUser } from '@mec/auth'
import { ProjectDataValidation } from '@mec/web/project/project'
import { prisma } from '@mec/db'
import { v4 } from 'uuid'
import z from 'zod'
import { District } from '@mec/web/projethoteque/legacyProjects'
import { findLegacyProjects } from '@mec/web/projethoteque/findLegacyProjects'
import { Category } from '@mec/web/anctProjects'
import { searchCommunity } from '@mec/web/siren/siren'

const t = initTRPC.context<AppContext>().create()

const enforceUserIsLoggedIn = (
  user: SessionUser | null,
): user is SessionUser => {
  if (!user) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User is not authenticated',
    })
  }
  return true
}

export const appRouter = t.router({
  createProject: t.procedure
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
        const project = await prisma.project.create({
          data: {
            id,
            reference,
            community: {
              connectOrCreate: {
                where: { id: community.id },
                create: { ...community, zipcodes: community.zipcodes ?? [] },
              },
            },
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
            attachments: { createMany: { data: attachments } },
          },
          include: { attachments: true, community: true },
        })

        return { project }
      },
    ),
  searchCommunity: t.procedure
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
  findLegacyProject: t.procedure
    .input(
      z.object({
        districts: z.array(z.string()),
        categories: z.array(z.string()),
        limit: z.number().min(1).max(20).optional(),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ input: { districts, categories, cursor, limit = 20 } }) => {
      return findLegacyProjects({
        activeCategoriesFilters: categories as Category[],
        activeDistrictsFilters: districts as District[],
        limit,
        cursor,
      })
    }),
})
// export type definition of API
export type AppRouter = typeof appRouter
