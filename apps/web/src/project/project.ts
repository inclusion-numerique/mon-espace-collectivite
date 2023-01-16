import z from 'zod'
import { labelsToOptions } from '@mec/web/utils/options'

const intErrorMessage =
  "Veuillez renseigner un nombre arrondi à l'entier le plus proche"

const isoDateRegex = /^\d{4}-\d\d-\d\d$/

export const ProjectDataValidation = z.object({
  scope: z.string({
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
