import z from 'zod'

const intErrorMessage =
  "Veuillez renseigner un nombre arrondi à l'entier le plus proche"

const isoDateRegex = /^\d{4}-\d\d-\d\d$/

// An ownerCode can be a municipality or an intercomunality.
// We can recognize them by their prefix: "m:{municipalityCode}" or "i:{intercommunalityCode}"

type PerimeterCode =
  | { municipalityCode: string; intercommunalityCode: null }
  | { municipalityCode: null; intercommunalityCode: string }

export const perimeterCodeToOwnerCode = (perimeter: {
  intercommunalityCode?: undefined | null | string
  municipalityCode?: undefined | null | string
}) =>
  perimeter.intercommunalityCode
    ? `i:${perimeter.intercommunalityCode}`
    : `m:${perimeter.municipalityCode}`

export const ownerCodeToPerimeter = (code: string): PerimeterCode => {
  const [prefix, modelCode] = code.split(':')
  if (prefix === 'i') {
    return { intercommunalityCode: modelCode, municipalityCode: null }
  }
  return { municipalityCode: modelCode, intercommunalityCode: null }
}

export const ProjectDataValidation = z.object({
  ownerCode: z.string({
    required_error: 'Veuillez renseigner la collectivité porteuse du projet',
  }),
  name: z.string({
    required_error: 'Veuillez renseigner le nom du projet',
  }),
  totalAmount: z.number({
    required_error: 'Veuillez renseigner le montant TTC',
  }),
  categoryId: z.string({
    required_error: 'Veuillez renseigner la thématique principale',
  }),
  secondaryCategoryIds: z.array(
    z.string({
      required_error: 'Veuillez renseigner une thématique secondaire valide',
    }),
  ),
  contactEmail: z
    .string({
      required_error: 'Veuillez renseigner un email de contact',
    })
    .email('Veuillez renseigner un email valide'),
  phone: z
    .string({
      required_error: 'Veuillez renseigner un numéro de téléphone',
    })
    .optional(),
  start: z
    .string()
    .regex(isoDateRegex, 'Veuillez renseigner une date valide')
    .optional(),
  end: z
    .string()
    .regex(isoDateRegex, 'Veuillez renseigner une date valide')
    .optional(),
  progress: z.string().optional(),
  artificializedArea: z.number().int(intErrorMessage).optional(),
  greenhouseGasEmissions: z.number().int(intErrorMessage).optional(),
  waterConsumption: z.number().int(intErrorMessage).optional(),
  selectiveSortingPercentage: z.number().int(intErrorMessage).optional(),
  bikePathLength: z.number().int(intErrorMessage).optional(),
  energyConsumption: z.number().int(intErrorMessage).optional(),
})

export type ProjectData = z.infer<typeof ProjectDataValidation>
