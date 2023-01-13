'use client'

import { useForm } from 'react-hook-form'
import { SelectFormField } from '@mec/web/form/SelectFormField'
import { InputFormField } from '@mec/web/form/InputFormField'
import z from 'zod'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Routes } from '@mec/web/app/routing'
import { PublicConfig } from '@mec/web/config'
import {
  projectScopeOptions,
  ProjectScopes,
  reverseUrlProjectScopes,
  UrlProjectScope,
  urlProjectScopes,
} from '@mec/web/project/project'

const AdministratorPerimeterDataValidation = z.object({
  scope: z.enum(ProjectScopes, {
    errorMap: () => ({
      message: 'Veuillez renseigner le niveau',
    }),
  }),
  perimeter: z
    .string({
      required_error: 'Veuillez renseigner le périmètre',
    })
    .min(2, 'Veuillez renseigner un périmètre valide'),
})

type AdministratorPerimeterData = z.infer<
  typeof AdministratorPerimeterDataValidation
>

export const AdministratorPerimeterForm = () => {
  const router = useRouter()
  const [urlScope, perimeter] = useSelectedLayoutSegments() as [
    UrlProjectScope,
    string,
  ]
  const displayablePerimeter = perimeter ? decodeURIComponent(perimeter) : ''
  const { control, handleSubmit, reset } = useForm<AdministratorPerimeterData>({
    defaultValues: {
      scope: reverseUrlProjectScopes[urlScope],
      perimeter: displayablePerimeter,
    },
    resolver: zodResolver(AdministratorPerimeterDataValidation),
  })

  const onSubmit = ({ perimeter, scope }: AdministratorPerimeterData) => {
    router.push(
      Routes.MonEspace.Projets.Scope.Perimeter({
        perimeter,
        scope: urlProjectScopes[scope],
      }),
    )
    // We allow the form to be submitted again but keep field values
    reset(
      { perimeter, scope },
      //   {
      //   keepIsSubmitted: false,
      //   keepDefaultValues: false,
      //   keepDirty: true,
      //   keepDirtyValues: true,
      //   keepIsValid: true,
      //   keepErrors: true,
      //   keepSubmitCount: true,
      //   keepTouched: true,
      //   keepValues: true,
      // }
    )
  }

  return (
    <div className="fr-container">
      <div
        className="fr-callout fr-mt-6v"
        style={{
          width: '100%',
          backgroundColor: 'var(--background-alt-grey)',
        }}
      >
        <h3 className="fr-callout__title">Périmètre des projets</h3>
        <p>
          En tant qu&apos;administrateur de {PublicConfig.productTitle}, vous
          pouvez consulter les projets sur le périmètre de votre choix sur 4
          niveaux de détail.
        </p>
        <p className="fr-text--sm fr-mt-2v">Par exemple :</p>
        <ul className="fr-text--sm fr-mt-1v">
          <li>Préfecture : Rhône (69)</li>
          <li>Sous-Préfecture : Lyon (691)</li>
          <li>EPCI : Métropole de Lyon (200046977)</li>
          <li>Municipalité : Lyon 2e Arrondissement (69382)</li>
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fr-grid-row fr-grid-row--gutters fr-mt-4v">
            <div className="fr-col-md-6 fr-col-lg-4">
              <SelectFormField
                control={control}
                label="Niveau"
                hint="Niveau de détail du département à la municipalité"
                path="scope"
                defaultOption
                options={projectScopeOptions}
              />
            </div>
            <div className="fr-col-md-6 fr-col-lg-4">
              <InputFormField
                control={control}
                label="Périmètre"
                path="perimeter"
                hint="E.g. Rhône, 69, 691, Métropole de Lyon, 200046977, 69382"
                placeholder="Code INSEE ou nom exact"
              />
            </div>
            <div className="fr-col-12 fr-col-lg-4 fr-col--bottom">
              <button type="submit" className="fr-btn fr-btn--secondary">
                Appliquer le périmètre
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
