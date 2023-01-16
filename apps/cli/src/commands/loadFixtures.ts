import 'tsconfig-paths/register'
import { prismaClient } from '@mec/web/src/prismaClient'
import { PrivateConfig } from '@mec/web/src/config'

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
}

const main = async () => {
  await loadCommonFixtures()
  if (!PrivateConfig.isMain) {
    await loadPreviewFixtures()
  }
}

main().then(() => process.exit(0))
