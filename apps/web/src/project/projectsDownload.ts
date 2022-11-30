import { getUrl } from '@mec/web/utils/baseUrl'
import { dashboardRootPath } from '@mec/web/dashboard/dashboard'
import { prisma } from '@mec/db'

export const projectsCsvFilename = () =>
  `Mon espace collectivité - ${new Date().toISOString().slice(0, 10)}.csv`

const csvHeaders = [
  'Référence',
  'Date',
  'Type de collectivité',
  'Collectivité',
  'Code postal',
  'Point de contact',
  'Qualité du point de contact',
  'Email',
  'Téléphone',
  'Domaine',
  'Solution',
  'Description',
  'Dates',
  'Partenaires',
  'Technique',
  'Pièces jointes',
  'Lien',
]

export const generateProjectsCsvData = async (): Promise<string[][]> => {
  const rows = await prisma.project.findMany({
    include: { attachments: true, community: true },
  })

  return [
    csvHeaders,
    ...rows.map(
      ({
        reference,
        created,
        community,
        name,
        quality,
        email,
        phone,
        domain,
        solution,
        description,
        dates,
        partners,
        tech,
        attachments,
      }) => [
        reference,
        created.toISOString(),
        community.scale,
        community.name,
        community.zipcodes.join(', '),
        name,
        quality,
        email,
        phone ?? '',
        domain,
        solution,
        description,
        dates,
        partners,
        tech,
        attachments.length.toString(),
        `${getUrl(`${dashboardRootPath}/${reference}`)}`,
      ],
    ),
  ]
}
