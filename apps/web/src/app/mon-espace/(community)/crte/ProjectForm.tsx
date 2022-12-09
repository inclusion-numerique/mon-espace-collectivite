'use client'
import { useForm } from 'react-hook-form'
import { trpc } from '@mec/web/trpc'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { withTrpc } from '@mec/web/withTrpc'
import {
  ProjectData,
  ProjectDataValidation,
  topicTree,
} from '@mec/web/project/project'
import { InputFormField } from '@mec/web/form/InputFormField'
import Link from 'next/link'
import { SelectFormField } from '@mec/web/form/SelectFormField'
import { Options } from '@mec/web/utils/options'
import { useRouter, useSearchParams } from 'next/navigation'
import { Project, Community } from '@prisma/client'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { removeNullValues } from '@mec/web/utils/removeNullValues'
import { ProjectDeletion } from '@mec/web/app/mon-espace/(community)/crte/[reference]/ProjectDeletion'

// Todo extract this ? Or make prop type of project data ?
// FIXME Serialization is broken, use superjson ?
type ProjectWithCommunity = Project & {
  start: string | undefined
  end: string | undefined
  community: Community
}

const defaultValuesFromExistingProject = (
  project: ProjectWithCommunity,
): DefaultValues<ProjectData> => {
  const { community, totalAmount, ...data } = project

  return removeNullValues({
    ...data,
    totalAmount: parseFloat(`${totalAmount}`),
    secondaryTopics: [],
  })
}

const ProjectForm = ({
  communityOptions,
  project,
}: {
  communityOptions: Options
  project?: ProjectWithCommunity
}) => {
  // Fields can be autofocused by passing their path as query params
  const focus = useSearchParams().get('focus')
  const autoFocus = (field: FieldPath<ProjectData>) => focus === field

  const createProject = trpc.project.create.useMutation()
  const updateProject = trpc.project.update.useMutation()

  const router = useRouter()
  const form = useForm<ProjectData>({
    resolver: zodResolver(ProjectDataValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: project
      ? defaultValuesFromExistingProject(project)
      : {
          communityId: communityOptions[0].value,
          secondaryTopics: [],
        },
  })
  const { handleSubmit, control } = form

  const onSubmit = async (data: ProjectData) => {
    if (project?.id) {
      try {
        await updateProject.mutateAsync({ id: project.id, ...data })
        router.prefetch('/mon-espace')
        router.back()
      } catch (err) {
        // Error message will be in hook result
      }
      return
      // TODO check that this work for refreshing data in list
    }
    try {
      await createProject.mutateAsync(data)
      router.prefetch('/mon-espace')
    } catch (err) {
      // Error message will be in hook result
    }
    // TODO check that this work for refreshing data in list
  }

  const fieldsDisabled = createProject.isLoading || updateProject.isLoading

  return (
    <div className="fr-card" style={{ width: '100%' }}>
      <div className="fr-card__body">
        {createProject.isSuccess ? (
          <div className="fr-card__content">
            <h2>Votre projet CRTE a bien été enregistré</h2>
            <Link href="/mon-espace" className="fr-btn fr-btn--secondary">
              Retour à mon espace
            </Link>
          </div>
        ) : (
          <div className="fr-card__content">
            <h2>Renseignez votre projet CRTE</h2>
            <p className="fr-text--sm fr-mb-3w">
              *&nbsp;Les champs signalés par une astérisque sont obligatoires
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="fr-text--bold">Description du projet</p>
              <InputFormField
                label="Nom du projet *"
                disabled={fieldsDisabled}
                control={control}
                path="name"
                autoFocus={autoFocus('name')}
              />
              <SelectFormField
                label="Porteur du projet *"
                disabled={fieldsDisabled}
                control={control}
                path="communityId"
                options={communityOptions}
                autoFocus={autoFocus('communityId')}
              />
              <InputFormField
                label="Montant TTC *"
                hint="Indiquez le montant en €"
                disabled={fieldsDisabled}
                control={control}
                path="totalAmount"
                type="number"
                valueAsNumber
                autoFocus={autoFocus('totalAmount')}
              />
              <SelectFormField
                label="Thématique principale *"
                disabled={fieldsDisabled}
                control={control}
                path="topic"
                groups
                optionGroups={topicTree}
                defaultOption
                placeholder="Sélectionner une option"
                autoFocus={autoFocus('topic')}
              />
              <hr />
              <p className="fr-text--bold">Informations de contact</p>
              <InputFormField
                label="Email de contact *"
                disabled={fieldsDisabled}
                control={control}
                path="contactEmail"
                type="email"
                autoFocus={autoFocus('contactEmail')}
              />
              <hr />
              <p className="fr-text--bold">Calendrier du projet</p>
              <InputFormField
                label="Date de début du projet"
                disabled={fieldsDisabled}
                control={control}
                path="start"
                type="date"
                autoFocus={autoFocus('start')}
              />
              <InputFormField
                label="Date de fin du projet"
                disabled={fieldsDisabled}
                control={control}
                path="end"
                type="date"
                autoFocus={autoFocus('end')}
              />
              <InputFormField
                label="État d'avancement"
                disabled={fieldsDisabled}
                control={control}
                path="progress"
                type="text"
                autoFocus={autoFocus('progress')}
              />
              <hr />
              <p className="fr-text--bold">
                Indicateurs de transition écologiques
              </p>
              <p className="fr-text--sm">
                Les indicateurs sont à renseigner avec des nombres entiers
              </p>
              <InputFormField
                label="Surface artificialisée"
                hint="En m², vous pouvez renseigner un nombre négatif"
                disabled={fieldsDisabled}
                control={control}
                path="artificializedArea"
                type="number"
                valueAsNumber
                step={1}
                autoFocus={autoFocus('artificializedArea')}
              />
              <InputFormField
                label="Émissions GES du projet"
                hint="En tonne d'équivalent CO2 "
                disabled={fieldsDisabled}
                control={control}
                path="greenhouseGasEmissions"
                type="number"
                valueAsNumber
                step={1}
                autoFocus={autoFocus('greenhouseGasEmissions')}
              />
              <InputFormField
                label="Consommation d'eau"
                hint="En m³"
                disabled={fieldsDisabled}
                control={control}
                path="waterConsumption"
                type="number"
                valueAsNumber
                step={1}
                autoFocus={autoFocus('waterConsumption')}
              />
              <InputFormField
                label="Part de tri sélectif"
                hint="En pourcentage"
                disabled={fieldsDisabled}
                control={control}
                path="selectiveSortingPercentage"
                type="number"
                valueAsNumber
                step={1}
                autoFocus={autoFocus('selectiveSortingPercentage')}
              />
              <InputFormField
                label="Pistes cyclables créées"
                hint="En km"
                disabled={fieldsDisabled}
                control={control}
                path="bikePathLength"
                type="number"
                valueAsNumber
                step={1}
                autoFocus={autoFocus('bikePathLength')}
              />
              <InputFormField
                label="Consommations énergétique du projet"
                hint="En kWh"
                disabled={fieldsDisabled}
                control={control}
                path="energyConsumption"
                type="number"
                valueAsNumber
                step={1}
                autoFocus={autoFocus('energyConsumption')}
              />
              {createProject.isError ? (
                <p className="fr-error-text">
                  {createProject.error?.message ??
                    'Une erreur est survenue, merci de réessayer.'}
                </p>
              ) : null}
              <div
                className="fr-btns-group fr-btns-group--icon-left"
                style={{ position: 'sticky', bottom: 0, background: 'white' }}
              >
                {/*TODO display mutations error*/}
                <button
                  className="fr-btn fr-mt-8v fr-icon-checkbox-circle-line"
                  type="submit"
                  disabled={createProject.isLoading}
                >
                  Enregistrer le projet
                </button>
                <Link
                  className="fr-btn fr-btn--tertiary fr-mt-4v fr-icon-arrow-left-line"
                  href="/mon-espace"
                >
                  Annuler
                </Link>
              </div>
            </form>
            {project ? (
              <>
                <hr className="fr-mt-6v" />
                <ProjectDeletion project={project} />
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default withTrpc(ProjectForm)
