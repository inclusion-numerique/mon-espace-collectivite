import { Scope } from '@mec/web/scope'

export const getUserAccessLevel = async ({
  user: { id },
}: {
  scope: Scope
  user: { id: string }
}) => {}
