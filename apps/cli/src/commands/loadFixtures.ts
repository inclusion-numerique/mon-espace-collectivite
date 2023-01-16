import 'tsconfig-paths/register'
import { prismaClient } from '@mec/web/src/prismaClient'
import { PrivateConfig, PublicConfig } from '@mec/web/src/config'

// Loaded on all environments
export const loadCommonFixtures = async () => {
  await prismaClient.preRegistration.createMany({
    data: [
      {
        email: 'hugues.maignol@beta.gouv.fr',
        allowSignup: true,
        role: 'Administrator',
        name: 'Hugues Maignol',
        firstName: 'Hugues',
        lastName: 'Maignol',
      },
      {
        email: 'thibault.rouveyrol@beta.gouv.fr',
        allowSignup: true,
        role: 'Administrator',
        name: 'Thibault Rouveyrol',
        firstName: 'Thibault',
        lastName: 'Rouveyrol',
      },
    ],
    skipDuplicates: true,
  })
}

// Only loaded in preview environment, not main
export const loadPreviewFixtures = async () => {
  await prismaClient.preRegistration.createMany({
    data: [
      {
        email: 'hugues@kime.tech',
        allowSignup: true,
        role: 'Administrator',
        name: 'Hugues Maignol',
        firstName: 'Hugues',
        lastName: 'Maignol',
      },
      {
        email: 'thibault@kime.tech',
        allowSignup: true,
        role: 'Administrator',
        name: 'Thibault Rouveyrol',
        firstName: 'Thibault',
        lastName: 'Rouveyrol',
      },
      {
        email: 'sylvain.aubry@beta.gouv.fr',
        allowSignup: true,
        role: 'Administrator',
        name: 'Sylvain Aubry',
        firstName: 'Sylvain',
        lastName: 'Aubry',
      },
      {
        email: 'gabriel.fonlladosa@anct.gouv.fr',
        allowSignup: true,
        role: 'Administrator',
        name: 'Gabriel Fonlladosa',
        firstName: 'Gabriel',
        lastName: 'Fonlladosa',
      },
      {
        email: 'simon.karleskind@ecologie-territoires.gouv.fr',
        allowSignup: true,
        role: 'Administrator',
        name: 'Simon Karleskind',
        firstName: 'Simon',
        lastName: 'Karleskind',
      },
      {
        email: 'marine.choquin@anct.gouv.fr',
        allowSignup: true,
        role: 'Administrator',
        name: 'Marine Choquin',
        firstName: 'Marine',
        lastName: 'Choquin',
      },
      {
        email: 'julia.herriot@anct.gouv.fr',
        allowSignup: true,
        role: 'Administrator',
        name: 'Julia Herriot',
        firstName: 'Julia',
        lastName: 'Herriot',
      },
      {
        email: 'caroline.corbal@anct.gouv.fr',
        allowSignup: true,
        role: 'Administrator',
        name: 'Caroline Corbal',
        firstName: 'Caroline',
        lastName: 'Corbal',
      },
      {
        email: 'pierre-louis.rolle@anct.gouv.fr',
        allowSignup: true,
        role: 'Administrator',
        name: 'Rolle',
        firstName: 'Pierre-Louis',
        lastName: 'Rolle',
      },
      {
        email: 'julie.ripa@anct.gouv.fr',
        allowSignup: true,
        role: 'Administrator',
        name: 'Julie Ripa',
        firstName: 'Julie',
        lastName: 'Ripa',
      },
      {
        email: 'clara@collectifco.com',
        allowSignup: true,
        role: 'Administrator',
        firstName: 'Clara',
      },
      {
        email: 'bernadette@collectifco.com',
        allowSignup: true,
        role: 'Administrator',
        firstName: 'Bernadette',
      },
      {
        email: 'hugues+maire@kime.tech',
        allowSignup: true,
        level: 'Owner',
        role: 'User',
        name: 'Hugues Maignol',
        firstName: 'Hugues',
        lastName: 'Maignol',
        municipalityCode: '69123',
      },
      {
        email: 'hugues+epci@kime.tech',
        allowSignup: true,
        level: 'Owner',
        role: 'User',
        name: 'Hugues Maignol',
        firstName: 'Hugues',
        lastName: 'Maignol',
        intercommunalityCode: '200046977',
      },
      {
        email: 'hugues+sousprefet@kime.tech',
        allowSignup: true,
        level: 'Owner',
        role: 'User',
        name: 'Hugues Maignol',
        firstName: 'Hugues',
        lastName: 'Maignol',
        districtCode: '691',
      },
      {
        email: 'hugues+prefet@kime.tech',
        allowSignup: true,
        level: 'Owner',
        role: 'User',
        name: 'Hugues Maignol',
        firstName: 'Hugues',
        lastName: 'Maignol',
        countyCode: '69',
      },
    ],
    skipDuplicates: true,
  })

  await prismaClient.project.createMany({
    data: [
      // Muncicipalité Lyon
      {
        id: 'c2a0bbab-c69e-4940-a070-77252827bb54',
        reference: 'DEMO0001',
        name: 'Aménagement du parvis des écoles',
        municipalityCode: '69123',
        categoryId: '10',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 200_000,
      },
      {
        id: 'd67d0db5-22ef-40c0-8748-ad1312125797',
        reference: 'DEMO0002',
        name: 'Habitat inclusif: Résidence Le Grand Chêne',
        municipalityCode: '69123',
        categoryId: '71',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 800_000,
      },
      {
        id: '6c3fae72-7aad-47e9-a574-1802f0a0e6a3',
        reference: 'DEMO0003',
        name: 'Nouvel espace commercial',
        municipalityCode: '69123',
        categoryId: '42',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 4_200_000,
      },
      // Municipalité Lyon 2e arrondissement
      {
        id: '00a28935-4ab4-4c99-996e-a7e86e6e8590',
        reference: 'DEMO0004',
        name: 'Réinvestissement des friches',
        municipalityCode: '69382',
        categoryId: '70',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 2_100_000,
      },
      {
        id: '9434130e-817a-4989-bec1-eaf1b708fe54',
        reference: 'DEMO0005',
        name: 'Nouveau cinéma',
        municipalityCode: '69382',
        categoryId: '68',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 1_200_000,
      },
      // EPCI Metropole Lyon
      {
        id: '0d003095-b526-478a-9789-a3b33a0ef5c9',
        reference: 'DEMO0006',
        name: 'France services',
        intercommunalityCode: '200046977',
        categoryId: '36',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 500_000,
      },
      {
        id: '18a2d062-0d7c-4f27-84fc-250996541291',
        reference: 'DEMO0007',
        name: 'Piétonisation court Suchet',
        intercommunalityCode: '200046977',
        categoryId: '19',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 8_300_000,
      },
      {
        id: '58498ebe-22cc-4337-b3b4-baf953984e99',
        reference: 'DEMO0008',
        name: 'Centre oenotouristique',
        intercommunalityCode: '200046977',
        categoryId: '46',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 400_000,
      },
      // EPCI Est Lyonnais
      {
        id: '1c65ef87-d40d-4c7d-aded-ffe82f10bb27',
        reference: 'DEMO0009',
        name: 'Fabriques numériques des quartiers populaires',
        intercommunalityCode: '246900575',
        categoryId: '34',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 600_000,
      },
      {
        id: '1f691986-f100-41d3-9bbf-b38e7173c6ab',
        reference: 'DEMO0010',
        name: 'Reconversion du bassin industriel',
        intercommunalityCode: '246900575',
        categoryId: '42',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 56_000_000,
      },
      {
        id: '382eb3aa-930c-43bc-a45d-62a89b8283f8',
        reference: 'DEMO0011',
        name: "Transformation d'usage d'anciens ateliers en logements conventionnés",
        intercommunalityCode: '246900575',
        categoryId: '71',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 2_300_000,
      },
      {
        id: '02916acf-47a3-407c-bc25-168ddbde0327',
        reference: 'DEMO0012',
        name: "Modernisation de l'éclairage public",
        intercommunalityCode: '246900575',
        categoryId: '25',
        contactEmail: PublicConfig.contactEmail,
        totalAmount: 400_000,
      },
    ],
    skipDuplicates: true,
  })
}

const main = async () => {
  await loadCommonFixtures()
  if (!PrivateConfig.isMain) {
    await loadPreviewFixtures()
  }
}

main().then(() => process.exit(0))
