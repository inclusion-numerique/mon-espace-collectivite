// XXX What is the best practice to store path variables ?
// Ideal would be to validate path depending on directory structure

import { Scale, UrlScale } from '@mec/web/scope'

const withSearchParams =
  <T extends Record<string, string | undefined>>(
    base: string,
  ): ((params: T) => string) =>
  (params: T) => {
    const definedParams = Object.fromEntries(
      Object.entries(params).filter(
        (entry): entry is [string, string] => entry[1] !== undefined,
      ),
    )
    const paramsString = new URLSearchParams(definedParams).toString()
    if (!paramsString) {
      return base
    }
    return `${base}?${paramsString}`
  }

export const Routes = {
  MonEspace: {
    Index: '/mon-espace',
    IndexWithParams: withSearchParams<{
      updatedProject?: string
      createdProject?: string
      overridenRole?: string
    }>('/mon-espace'),
    Indicateurs: {
      Index: '/mon-espace/indicateurs',
    },
    Projets: {
      Index: '/mon-espace/projets',
      Scale: {
        Code: ({ scale, code }: { scale: UrlScale; code: string }) =>
          `/mon-espace/projets/${scale}/${code}`,
      },
    },
    Projet: {
      Nouveau: '/mon-espace/projet/nouveau',
      NouveauWithParams: withSearchParams<{
        scale?: string | undefined
        code?: string | undefined
      }>('/mon-espace/projet/nouveau'),
      Modifier: (
        reference: string,
        params: {
          focus?: string | undefined
          scale?: Scale | undefined
          code?: string | undefined
        } = {},
      ) => withSearchParams(`/mon-espace/projet/${reference}`)(params),
    },
  },
  Connexion: {
    Login: '/connexion/login',
    Logout: '/connexion/logout',
    Erreur: '/connexion/erreur',
    Verification: '/connexion/verification',
  },
}
