import z from 'zod'

type PerimeterDataPartial = {
  municipalityCode?: string | undefined
  districtCode?: string | undefined
  countyCode?: string | undefined
  intercommunalityCode?: string | undefined
}
const perimeterDataRefine = (data: PerimeterDataPartial) =>
  data.municipalityCode ||
  data.countyCode ||
  data.districtCode ||
  data.intercommunalityCode

const perimeterRefineError = 'Perimeter should have a valid locality'

export const PerimeterDataValidation = z
  .object({
    municipalityCode: z.string(),
    districtCode: z.string(),
    countyCode: z.string(),
    intercommunalityCode: z.string(),
  })
  .partial()

const BaseProjectNoteData = z.object({
  content: z.string().optional().default(''),
})

export const ProjectNoteCreationDataValidation = BaseProjectNoteData.merge(
  PerimeterDataValidation,
)
  .merge(
    z.object({
      projectId: z.string().uuid(),
    }),
  )
  .refine(perimeterDataRefine, perimeterRefineError)

export type ProjectNoteCreationData = z.infer<
  typeof ProjectNoteCreationDataValidation
>

export const ProjectNoteEditionDataValidation = BaseProjectNoteData.merge(
  z.object({ id: z.string().uuid() }),
)

export type ProjectNoteEditionData = z.infer<
  typeof ProjectNoteEditionDataValidation
>
