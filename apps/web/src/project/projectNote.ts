import z from 'zod'

export const ProjectNoteDataValidation = z.object({
  projectId: z.string().uuid(),
  content: z.string().optional().default(''),
})
export type ProjectNoteData = z.infer<typeof ProjectNoteDataValidation>
