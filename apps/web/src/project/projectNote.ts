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
  projectId: z.string().uuid(),
  content: z.string().optional().default(''),
})

export const ProjectNoteDataValidation = BaseProjectNoteData.merge(
  PerimeterDataValidation,
).refine(perimeterDataRefine, perimeterRefineError)

export type ProjectNoteData = z.infer<typeof ProjectNoteDataValidation>

export const ProjectNoteDataValidationWithId = BaseProjectNoteData.merge(
  z.object({ id: z.string().uuid() }),
)
  .merge(PerimeterDataValidation)
  .refine(perimeterDataRefine, perimeterRefineError)
