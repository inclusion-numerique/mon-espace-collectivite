import z, { string } from 'zod'
import { Options } from '@mec/web/utils/options'

const intErrorMessage =
  "Veuillez renseigner un nombre arrondi à l'entier le plus proche"

const isoDateRegex = /^\d{4}-\d\d-\d\d$/

export const ProjectDataValidation = z.object({
  communityId: z.string({
    required_error: 'Veuillez renseigner la collectivité porteuse du projet',
  }),
  name: z.string({
    required_error: 'Veuillez renseigner le nom du projet',
  }),
  totalAmount: z.number({
    required_error: 'Veuillez renseigner le montant TTC',
  }),
  topic: z.string({
    required_error: 'Veuillez renseigner la thématique principale',
  }),
  secondaryTopics: z.array(z.string()),
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

const projectDomains = [
  'Accès au numérique',
  'Services au public',
  'Transport et mobilités',
  'Transition écologique',
  'Logement et cadre de vie',
  'Développement économique',
  'Infrastructures locales',
  'Solidarité',
  'Éducation et jeunesse',
  'Attractivité et dynamisme territorial',
]

// Labels and values are the same
export const domainOptions: Options = projectDomains.map((domain) => ({
  name: domain,
  value: domain,
}))

export const topics = [
  'Eau et milieux aquatiques / Eau potable',
  'Eau et milieux aquatiques / Eau de pluie',
  'Eau et milieux aquatiques / Assainissement des eaux',
  'Eau et milieux aquatiques / Eau souterraine',
  "Eau et milieux aquatiques / Cours d'eau / canaux / plans d'eau",
  'Eau et milieux aquatiques / Mers et océans',
  'Culture et identité collective / patrimoine / sports / Patrimoine et monuments historiques',
  'Culture et identité collective / patrimoine / sports / Culture et identité collective',
  'Culture et identité collective / patrimoine / sports / Arts plastiques et photographie',
  'Culture et identité collective / patrimoine / sports / Musée',
  'Culture et identité collective / patrimoine / sports / Sports et loisirs',
  'Culture et identité collective / patrimoine / sports / Spectacle vivant',
  'Culture et identité collective / patrimoine / sports / Médias et communication',
  'Culture et identité collective / patrimoine / sports / Bibliothèques et livres',
  'Nature / environnement / Forêts',
  'Nature / environnement / Montagne',
  'Nature / environnement / Sols',
  'Nature / environnement / Risques naturels',
  "Nature / environnement / Qualité de l'air",
  'Nature / environnement / Biodiversité',
  'Nature / environnement / Milieux humides',
  "Nature / environnement / Solutions d'adaptation fondées sur la nature (SafN)",
  'Urbanisme / logement / aménagement / Espaces verts',
  'Urbanisme / logement / aménagement / Espace public',
  'Urbanisme / logement / aménagement / Friche',
  'Urbanisme / logement / aménagement / Foncier',
  'Urbanisme / logement / aménagement / Voirie et réseaux',
  'Urbanisme / logement / aménagement / Equipement public',
  'Urbanisme / logement / aménagement / Bâtiments et construction',
  'Urbanisme / logement / aménagement / Réhabilitation',
  'Urbanisme / logement / aménagement / Logement et habitat',
  'Urbanisme / logement / aménagement / Architecture',
  'Urbanisme / logement / aménagement / Paysage',
  'Urbanisme / logement / aménagement / Accessibilité',
  'Urbanisme / logement / aménagement / Cimetières et funéraire',
  'Énergies / Déchets / Transition énergétique',
  "Énergies / Déchets / Economie d'énergie et rénovation énergétique",
  'Énergies / Déchets / Réseaux de chaleur',
  'Énergies / Déchets / Recyclage et valorisation des déchets',
  "Énergies / Déchets / Réduction de l'empreinte carbone",
  'Solidarités / lien social / Personnes âgées',
  'Solidarités / lien social / Jeunesse',
  'Solidarités / lien social / Famille et enfance',
  'Solidarités / lien social / Handicap',
  'Solidarités / lien social / Egalité des chances',
  'Solidarités / lien social / Accès aux services',
  'Solidarités / lien social / Cohésion sociale et inclusion',
  'Solidarités / lien social / Citoyenneté',
  'Solidarités / lien social / Santé',
  'Solidarités / lien social / Education et renforcement des compétences',
  'Solidarités / lien social / Alimentation',
  'Solidarités / lien social / Lutte contre la précarité',
  'Solidarités / lien social / Inclusion numérique',
  'Solidarités / lien social / Sécurité',
  'Solidarités / lien social / Protection animale',
  'Développement économique / production et consommation / Tourisme',
  'Développement économique / production et consommation / Commerces et services',
  'Développement économique / production et consommation / Formation professionnelle',
  'Développement économique / production et consommation / Technologies numériques et numérisation',
  'Développement économique / production et consommation / Tiers-lieux',
  'Développement économique / production et consommation / Economie circulaire',
  'Développement économique / production et consommation / Economie locale et circuits courts',
  'Développement économique / production et consommation / Agriculture et agroalimentaire',
  'Développement économique / production et consommation / Consommation et production',
  'Développement économique / production et consommation / Economie sociale et solidaire',
  'Développement économique / production et consommation / Revitalisation',
  'Développement économique / production et consommation / Innovation, créativité et recherche',
  'Développement économique / production et consommation / Emploi',
  'Développement économique / production et consommation / International',
  'Développement économique / production et consommation / Attractivité économique',
  'Développement économique / production et consommation / Artisanat',
  'Développement économique / production et consommation / Industrie',
  'Développement économique / production et consommation / Fiscalité des entreprises',
  'Mobilité / transports / Information voyageur, billettique multimodale',
  'Mobilité / transports / Transports collectifs et optimisation des trafics routiers',
  'Mobilité / transports / Mobilité partagée',
  'Mobilité / transports / Logistique urbaine',
  'Mobilité / transports / Mobilité pour tous',
  'Mobilité / transports / Connaissance de la mobilité',
  'Mobilité / transports / Modes actifs : vélo, marche et aménagements associés',
  'Mobilité / transports / Limiter les déplacements subis',
  'Mobilité / transports / Mobilité fluviale',
  'Mobilité / transports / Mobilité et véhicules autonomes',
  'Fonctions support / Appui méthodologique',
  'Fonctions support / Animation et mise en réseau',
  "Fonctions support / Valorisation d'actions",
  'Fonctions support / Prévention des risques',
] as const

export type Topic = typeof topics[number]

const buildTopicLeafs = (category: string) =>
  topics
    .filter((topic) => topic.startsWith(category))
    .map((topic) => ({
      value: topic,
      name: topic.substr(category.length + 3),
    }))

export const topicTree = {
  'Eau et milieux aquatiques': buildTopicLeafs('Eau et milieux aquatiques'),
  'Culture et identité collective / patrimoine / sports': buildTopicLeafs(
    'Culture et identité collective / patrimoine / sports',
  ),
  'Nature / environnement': buildTopicLeafs('Nature / environnement'),
  'Urbanisme / logement / aménagement': buildTopicLeafs(
    'Urbanisme / logement / aménagement',
  ),
  'Énergies / Déchets': buildTopicLeafs('Énergies / Déchets'),
  'Solidarités / lien social': buildTopicLeafs('Solidarités / lien social'),
  'Développement économique / production et consommation': buildTopicLeafs(
    'Développement économique / production et consommation',
  ),
  'Mobilité / transports': buildTopicLeafs('Mobilité / transports'),
  'Fonctions support': buildTopicLeafs('Fonctions support'),
}

export type TopicCategory = keyof typeof topicTree
