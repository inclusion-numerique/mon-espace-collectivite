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
import { useEffect, useState } from 'react'
import { Spinner } from '@mec/web/ui/Spinner'
import Link from 'next/link'

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
  const [urlScope, urlPerimeter] = useSelectedLayoutSegments() as [
    UrlProjectScope,
    string,
  ]
  const perimeter = urlPerimeter ? decodeURIComponent(urlPerimeter) : ''
  const scope = reverseUrlProjectScopes[urlScope] ?? ''
  const { control, handleSubmit, reset } = useForm<AdministratorPerimeterData>({
    defaultValues: {
      scope,
      perimeter,
    },
    resolver: zodResolver(AdministratorPerimeterDataValidation),
  })

  // TODO remove this logic when _loading.tsx -> loading.tsx works with next versions for these components using css
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(false)
  }, [urlScope, urlPerimeter])

  const onSubmit = (data: AdministratorPerimeterData) => {
    // TODO Can remove no-op when loading logic is removed
    // No-op
    if (perimeter === data.perimeter && scope === data.scope) {
      return
    }

    setIsLoading(true)
    router.push(
      Routes.MonEspace.Projets.Scope.Perimeter({
        perimeter: data.perimeter,
        scope: urlProjectScopes[data.scope],
      }),
    )
    // We allow the form to be submitted again but keep field values
    reset({ perimeter: data.perimeter, scope: data.scope })
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
        <p className="fr-text--sm fr-mt-2v">Par exemple&nbsp;:</p>
        <ul className="fr-text--sm fr-mt-1v">
          <li>
            <Link
              href={Routes.MonEspace.Projets.Scope.Perimeter({
                perimeter: '69',
                scope: 'prefecture',
              })}
            >
              Préfecture&nbsp;: Rhône (69)
            </Link>
          </li>
          <li>
            <Link
              href={Routes.MonEspace.Projets.Scope.Perimeter({
                perimeter: '691',
                scope: 'sous-prefecture',
              })}
            >
              Sous-Préfecture&nbsp;: Lyon (691)
            </Link>
          </li>
          <li>
            <Link
              href={Routes.MonEspace.Projets.Scope.Perimeter({
                perimeter: '200046977',
                scope: 'epci',
              })}
            >
              EPCI&nbsp;: Métropole de Lyon (200046977)
            </Link>
          </li>
          <li>
            <Link
              href={Routes.MonEspace.Projets.Scope.Perimeter({
                perimeter: '69382',
                scope: 'municipalite',
              })}
            >
              Municipalité&nbsp;: Lyon 2e Arrondissement (69382)
            </Link>
          </li>
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
                {isLoading ? <Spinner size="sm" /> : 'Appliquer'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
