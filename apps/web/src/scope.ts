import { labelsToOptions } from '@mec/web/utils/options'
import z from 'zod'
import { Project } from '@prisma/client'

export const Scales = [
  'county',
  'district',
  'intercommunality',
  'municipality',
] as const

export type Scale = typeof Scales[number]

export const scaleLabels: { [scope in Scale]: string } = {
  county: 'Préfecture',
  district: 'Sous-préfecture',
  intercommunality: 'EPCI',
  municipality: 'Municipalité',
}

// Localized url representation of scales
export const urlScales = {
  county: 'prefecture',
  district: 'sous-prefecture',
  intercommunality: 'epci',
  municipality: 'municipalite',
} as const satisfies { [scope in Scale]: string }
export type UrlScale = typeof urlScales[Scale]

export const reverseUrlScales: {
  [urlScope in UrlScale]: Scale
} = {
  prefecture: 'county',
  'sous-prefecture': 'district',
  epci: 'intercommunality',
  municipalite: 'municipality',
}

export const scaleOptions = labelsToOptions(scaleLabels)

// A scope is a delimiter of a territorial area defined by a scale (zoom) and code (unique identifier)
export type Scope = {
  scale: Scale
  code: string
}

// Validation for a valid Scope object
export const ScopeDataValidation = z.object({
  scale: z.enum(Scales, {
    errorMap: () => ({
      message: "Veuillez renseigner l'échelle",
    }),
  }),
  code: z
    .string({
      required_error: 'Veuillez renseigner le code',
    })
    .min(2, 'Veuillez renseigner un code valide'),
})

// In some case we want to project a Scope as a single string (in a select form for example)
// Here are the transform and reverse transform functions for these use cases

// An ownerCode can be a municipality or an intercomunality.
// We can recognize them by their prefix: "m:{municipalityCode}" or "i:{intercommunalityCode}"

export const scopeToString = (scope?: Scope): string =>
  scope ? `${scope.scale}:${scope.code}` : ''

export const stringToScope = (scopeString?: string): Scope | undefined => {
  if (!scopeString) {
    return undefined
  }
  const [scale, code] = scopeString.split(':')
  if (!code || !(scale in scaleLabels)) {
    throw new Error('Invalid scope string')
  }
  return { scale: scale as Scale, code }
}

export const projetToScope = (
  project: Pick<Project, 'intercommunalityCode' | 'municipalityCode'>,
): Scope | undefined => {
  if (project.intercommunalityCode) {
    return { scale: 'intercommunality', code: project.intercommunalityCode }
  }
  if (project.municipalityCode) {
    return { scale: 'municipality', code: project.municipalityCode }
  }
  return undefined
}

export const scopeFromPartial = (scope?: Partial<Scope>): Scope | undefined => {
  const code = scope?.code
  const scale = scope?.scale

  return code && scale ? { code, scale } : undefined
}
