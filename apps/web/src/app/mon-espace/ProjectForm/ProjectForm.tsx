'use client'
import { useForm } from 'react-hook-form'
import { trpc } from '@mec/web/trpc'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { withTrpc } from '@mec/web/withTrpc'
import {
  perimeterCodeToOwnerCode,
  ProjectData,
  ProjectDataValidation,
} from '@mec/web/project/project'
import { InputFormField } from '@mec/web/form/InputFormField'
import Link from 'next/link'
import { SelectFormField } from '@mec/web/form/SelectFormField'
import { Options, OptionsGroups } from '@mec/web/utils/options'
import { useRouter, useSearchParams } from 'next/navigation'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { removeNullValues } from '@mec/web/utils/removeNullValues'
import { SessionUser } from '@mec/web/auth/sessionUser'
import { deserialize, Serialized } from '@mec/web/utils/serialization'
import { MultipleBadgeSelectFormField } from '@mec/web/form/MultipleBadgeSelectFormField'
import { ProjectForProjectForm } from '@mec/web/app/mon-espace/ProjectForm/projectForProjectForm'
import { ProjectDeletion } from '@mec/web/app/mon-espace/ProjectForm/ProjectDeletion'
import { Routes } from '@mec/web/app/routing'

const defaultValuesFromExistingProject = (
  project: ProjectForProjectForm,
  user: SessionUser,
): DefaultValues<ProjectData> => {
  const { municipality, totalAmount, ...data } = project

  return removeNullValues({
    email: user.email,
    ...data,
    totalAmount: parseFloat(`${totalAmount}`),
    secondaryCategoryIds: project.secondaryCategories.map(({ id }) => id),
    ownerCode: perimeterCodeToOwnerCode(project),
  })
}

const ProjectForm = ({
  communityOptions,
  categoriesOptions,
  serializedProject,
  serializedUser,
}: {
  communityOptions: Options
  categoriesOptions: OptionsGroups
  serializedUser: Serialized<SessionUser>
  serializedProject?: Serialized<ProjectForProjectForm>
}) => {
  const project = serializedProject ? deserialize(serializedProject) : undefined
  const user = deserialize(serializedUser)
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
      ? defaultValuesFromExistingProject(project, user)
      : {
          ownerCode: communityOptions[0].value,
          secondaryCategoryIds: [],
          contactEmail: user.email,
        },
  })
  const { handleSubmit, control } = form

  const onSubmit = async (data: ProjectData) => {
    if (project?.id) {
      try {
        await updateProject.mutateAsync({ id: project.id, ...data })
        router.push(
          Routes.MonEspace.IndexWithParams({ updatedProject: project.id }),
        )
      } catch (err) {
        // Error message will be in hook result
      }
      return
      // TODO check that this work for refreshing data in list
    }
    try {
      const created = await createProject.mutateAsync(data)
      router.push(
        Routes.MonEspace.IndexWithParams({
          createdProject: created.project.id,
        }),
      )
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
            <h2>Votre projet CRTE a bien ??t?? enregistr??</h2>
            <Link
              href={Routes.MonEspace.Index}
              className="fr-btn fr-btn--secondary"
            >
              Retour ?? mon espace
            </Link>
          </div>
        ) : (
          <div className="fr-card__content">
            <h2>Renseignez votre projet CRTE</h2>
            <p className="fr-text--sm fr-mb-3w">
              *&nbsp;Les champs signal??s par une ast??risque sont obligatoires
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="fr-text--bold">Description du projet</p>
              <InputFormField
                label="Nom du projet??*"
                disabled={fieldsDisabled}
                control={control}
                path="name"
                autoFocus={autoFocus('name')}
              />
              <SelectFormField
                label="Porteur du projet??*"
                disabled={fieldsDisabled}
                control={control}
                path="ownerCode"
                options={communityOptions}
                autoFocus={autoFocus('ownerCode')}
              />
              <InputFormField
                label="Montant TTC??*"
                hint="Indiquez le montant en ???"
                disabled={fieldsDisabled}
                control={control}
                path="totalAmount"
                type="number"
                valueAsNumber
                autoFocus={autoFocus('totalAmount')}
              />
              <SelectFormField
                label="Th??matique principale??*"
                disabled={fieldsDisabled}
                control={control}
                path="categoryId"
                groups
                optionGroups={categoriesOptions}
                defaultOption
                placeholder="S??lectionnez une th??matique"
                autoFocus={autoFocus('categoryId')}
              />
              <MultipleBadgeSelectFormField
                label="Th??matiques secondaires"
                disabled={fieldsDisabled}
                control={control}
                path="secondaryCategoryIds"
                groups
                optionGroups={categoriesOptions}
                defaultOption
                defaultOptionLabel="Ajoutez une th??matique secondaire"
                placeholder="Ajoutez une th??matique secondaire"
                autoFocus={autoFocus('secondaryCategoryIds')}
              />
              <hr />
              <p className="fr-text--bold">Informations de contact</p>
              <InputFormField
                label="Email de contact??*"
                disabled={fieldsDisabled}
                control={control}
                path="contactEmail"
                type="email"
                autoFocus={autoFocus('contactEmail')}
              />
              <hr />
              <p className="fr-text--bold">Calendrier du projet</p>
              <InputFormField
                label="Date de d??but du projet"
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
                label="??tat d'avancement"
                disabled={fieldsDisabled}
                control={control}
                path="progress"
                type="text"
                autoFocus={autoFocus('progress')}
              />
              <hr />
              <p className="fr-text--bold">
                Indicateurs de transition ??cologiques
              </p>
              <p className="fr-text--sm">
                Les indicateurs sont ?? renseigner avec des nombres entiers
              </p>
              <InputFormField
                label="Surface artificialis??e"
                hint="En m??, vous pouvez renseigner un nombre n??gatif"
                disabled={fieldsDisabled}
                control={control}
                path="artificializedArea"
                type="number"
                valueAsNumber
                step={1}
                autoFocus={autoFocus('artificializedArea')}
              />
              <InputFormField
                label="??missions GES du projet"
                hint="En tonne d'??quivalent CO2 "
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
                hint="En m??"
                disabled={fieldsDisabled}
                control={control}
                path="waterConsumption"
                type="number"
                valueAsNumber
                step={1}
                autoFocus={autoFocus('waterConsumption')}
              />
              <InputFormField
                label="Part de tri s??lectif"
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
                label="Pistes cyclables cr????es"
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
                label="Consommations ??nerg??tique du projet"
                hint="En kWh"
                disabled={fieldsDisabled}
                control={control}
                path="energyConsumption"
                type="number"
                valueAsNumber
                step={1}
                autoFocus={autoFocus('energyConsumption')}
              />

              <div
                className="fr-btns-group fr-btns-group--icon-left"
                style={
                  project
                    ? { position: 'sticky', bottom: 0, background: 'white' }
                    : undefined
                }
              >
                {createProject.isError || updateProject.isError ? (
                  <p className="fr-error-text">
                    {createProject.error?.message ??
                      updateProject.error?.message ??
                      'Une erreur est survenue, merci de r??essayer.'}
                  </p>
                ) : null}
                <button
                  className="fr-btn fr-mt-8v fr-icon-checkbox-circle-line"
                  type="submit"
                  disabled={createProject.isLoading}
                >
                  Enregistrer le projet
                </button>
                <Link
                  className="fr-btn fr-btn--tertiary fr-mt-4v fr-icon-arrow-left-line"
                  href={Routes.MonEspace.Index}
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
