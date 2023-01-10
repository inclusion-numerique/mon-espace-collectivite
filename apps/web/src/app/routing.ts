// XXX What is the best practice to store path variables ?
// Ideal would be to validate path depending on directory structure

const withSearchParams =
  <T extends Record<string, string>>(base: string): ((params: T) => string) =>
  (params: T) => {
    const paramsString = new URLSearchParams(params).toString()
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
    }>('/mon-espace'),
    Projet: {
      Nouveau: '/mon-espace/projet/nouveau',
      Modifier: (reference: string, params: { focus?: string } = {}) =>
        withSearchParams(`/mon-espace/projet/${reference}`)(params),
    },
  },
  Connexion: {
    Login: '/connexion/login',
    Logout: '/connexion/logout',
    Erreur: '/connexion/erreur',
    Verification: '/connexion/verification',
  },
}
