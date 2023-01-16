'use client'

import { useForm } from 'react-hook-form'
import { SelectFormField } from '@mec/web/form/SelectFormField'
import { InputFormField } from '@mec/web/form/InputFormField'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Routes } from '@mec/web/app/routing'
import { PublicConfig } from '@mec/web/config'
import { useEffect, useState } from 'react'
import { Spinner } from '@mec/web/ui/Spinner'
import Link from 'next/link'
import {
  scaleOptions,
  Scope,
  ScopeDataValidation,
  scopeToUrl,
  UrlScale,
  urlToScope,
} from '@mec/web/scope'

export const ProjectListScopeForm = () => {
  const router = useRouter()
  const [urlScale, urlCode] = useSelectedLayoutSegments() as [UrlScale, string]

  const scope = urlToScope({ scale: urlScale, code: urlCode })

  const { control, handleSubmit, reset } = useForm<Scope>({
    defaultValues: { scale: scope.scale ?? '', code: scope.code ?? '' },
    resolver: zodResolver(ScopeDataValidation),
  })

  // TODO remove this logic when _loading.tsx -> loading.tsx works with next versions for these components using css
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(false)
  }, [urlScale, urlCode])

  const onSubmit = (data: Scope) => {
    // TODO Can remove no-op when loading logic is removed
    // No-op
    if (scope.code === data.code && scope.scale === data.scale) {
      return
    }

    setIsLoading(true)
    router.push(Routes.MonEspace.Projets.Scale.Code(scopeToUrl(data)))
    // We allow the form to be submitted again but keep field values
    reset({ scale: data.scale, code: data.code })
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
        <h3 className="fr-callout__title">Liste des projets</h3>
        <p>
          En tant qu&apos;administrateur de {PublicConfig.productTitle}, vous
          pouvez consulter les projets sur le périmètre de votre choix sur 4
          niveaux de détail.
        </p>
        <p className="fr-text--sm fr-mt-2v">Par exemple&nbsp;:</p>
        <ul className="fr-text--sm fr-mt-1v">
          <li>
            Préfecture&nbsp;:{' '}
            <Link
              href={Routes.MonEspace.Projets.Scale.Code({
                code: '69',
                scale: 'prefecture',
              })}
            >
              Rhône (69)
            </Link>
          </li>
          <li>
            Sous-Préfecture&nbsp;:{' '}
            <Link
              href={Routes.MonEspace.Projets.Scale.Code({
                code: '691',
                scale: 'sous-prefecture',
              })}
            >
              Lyon (691)
            </Link>
          </li>
          <li>
            EPCI&nbsp;:{' '}
            <Link
              href={Routes.MonEspace.Projets.Scale.Code({
                code: '200046977',
                scale: 'epci',
              })}
            >
              Métropole de Lyon (200046977)
            </Link>
          </li>
          <li>
            Municipalité&nbsp;:{' '}
            <Link
              href={Routes.MonEspace.Projets.Scale.Code({
                code: '69123',
                scale: 'municipalite',
              })}
            >
              Lyon (69123)
            </Link>
            ,{' '}
            <Link
              href={Routes.MonEspace.Projets.Scale.Code({
                code: '69382',
                scale: 'municipalite',
              })}
            >
              Lyon 2e Arrondissement (69382)
            </Link>
          </li>
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fr-grid-row fr-grid-row--gutters fr-mt-4v">
            <div className="fr-col-md-6 fr-col-lg-4">
              <SelectFormField
                control={control}
                label="Échelle"
                hint="Niveau de détail du département à la municipalité"
                path="scale"
                defaultOption
                options={scaleOptions}
              />
            </div>
            <div className="fr-col-md-6 fr-col-lg-4">
              <InputFormField
                control={control}
                label="Code"
                path="code"
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
