import React from 'react'

import { Meta } from '@storybook/react'

import { Onboarding } from './Onboarding'
export default {
  component: Onboarding,
} as Meta<typeof Onboarding>

export const Base = () => (
  <Onboarding name="Vincent Dupont" role="Maire de Abancourt" />
)
