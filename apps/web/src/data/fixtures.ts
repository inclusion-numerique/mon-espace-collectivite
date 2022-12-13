import { prismaClient } from '@mec/web/prismaClient'

export const loadFixtures = async () => {
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
        email: 'hugues+maire@kime.tech',
        allowSignup: true,
        level: 'Owner',
        role: 'Municipality',
        name: 'Hugues Maignol',
        firstName: 'Hugues',
        lastName: 'Maignol',
        municipalityCode: '69123',
      },
      {
        email: 'hugues+epci@kime.tech',
        allowSignup: true,
        level: 'Owner',
        role: 'Intercommunality',
        name: 'Hugues Maignol',
        firstName: 'Hugues',
        lastName: 'Maignol',
        intercommunalityCode: '200046977',
      },
      {
        email: 'hugues+sousprefet@kime.tech',
        allowSignup: true,
        level: 'Owner',
        role: 'SubPrefecture',
        name: 'Hugues Maignol',
        firstName: 'Hugues',
        lastName: 'Maignol',
        districtCode: '691',
      },
      {
        email: 'hugues+prefet@kime.tech',
        allowSignup: true,
        level: 'Owner',
        role: 'Prefecture',
        name: 'Hugues Maignol',
        firstName: 'Hugues',
        lastName: 'Maignol',
        countyCode: '69',
      },
    ],
    skipDuplicates: true,
  })
}
