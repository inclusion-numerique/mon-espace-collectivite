'use client'
import { useForm } from 'react-hook-form'
import { trpc } from '@mec/web/trpc'
import {
  ProjectNoteCreationData,
  ProjectNoteCreationDataValidation,
  ProjectNoteEditionData,
  ProjectNoteEditionDataValidation,
} from '@mec/web/project/projectNote'
import { useRef } from 'react'
import { InputFormField } from '@mec/web/form/InputFormField'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import { withTrpc } from '@mec/web/withTrpc'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { useRouter } from 'next/navigation'
import { DashboardScope } from '@mec/web/app/mon-espace/dashboard'
import { useProjectNoteModalStore } from '@mec/web/app/mon-espace/useProjectNoteModalStore'

const defaultValuesFromExistingProjectNote = (
  scope: DashboardScope,
  projectNote: { id: string; content: string } | null,
  projectId: string,
): DefaultValues<ProjectNoteCreationData | ProjectNoteEditionData> => {
  if (!projectNote) {
    // Creation with scope code
    if ('county' in scope) {
      return { projectId, countyCode: scope.county.code }
    }
    if ('district' in scope) {
      return { projectId, districtCode: scope.district.code }
    }
    if ('intercommunality' in scope) {
      return { projectId, intercommunalityCode: scope.intercommunality.code }
    }
    return { projectId, municipalityCode: scope.municipality.code }
  }

  return projectNote
}

export const ProjectNoteForm = withTrpc(
  ({
    project,
    projectNote,
    modalTitleId,
    scope,
  }: {
    project: { id: string; name: string }
    projectNote: { id: string; content: string } | null
    modalTitleId: string
    scope: DashboardScope
  }) => {
    const router = useRouter()
    const isCreation = !projectNote
    const resetModal = useProjectNoteModalStore((state) => state.reset)

    const form = useForm<ProjectNoteCreationData | ProjectNoteEditionData>({
      resolver: zodResolver(
        isCreation
          ? ProjectNoteCreationDataValidation
          : ProjectNoteEditionDataValidation,
      ),
      defaultValues: defaultValuesFromExistingProjectNote(
        scope,
        projectNote,
        project.id,
      ),
    })
    const closeRef = useRef<HTMLButtonElement>(null)
    const creation = trpc.project.createNote.useMutation()
    const update = trpc.project.updateNote.useMutation()
    const deletion = trpc.project.deleteNote.useMutation()

    const disableButtons =
      creation.isLoading ||
      creation.isSuccess ||
      update.isLoading ||
      update.isSuccess ||
      deletion.isLoading ||
      deletion.isSuccess

    const executeMutation = (
      data: ProjectNoteCreationData | ProjectNoteEditionData,
    ) => {
      const hasContent = !!data.content?.trim()
      if (isCreation) {
        if (!hasContent) {
          // Cancel creation if no content
          return
        }

        // TODO Scope with code only with zod validation for xxCode ?

        return creation.mutateAsync({ ...(data as ProjectNoteCreationData) })
      }

      // Delete note if no content
      if (!hasContent) {
        return deletion.mutateAsync({ id: projectNote.id })
      }

      return update.mutateAsync({ id: projectNote.id, ...data })
    }

    const onSubmit = async (
      data: ProjectNoteCreationData | ProjectNoteEditionData,
    ) => {
      console.log('SUBMIT ?', data)
      await executeMutation(data)
      closeRef.current?.click()
      router.refresh()
      creation.reset()
      update.reset()
      deletion.reset()
    }

    const hasError = creation.isError || update.isError || deletion.isError
    const errorMessage =
      creation.error?.message ??
      update.error?.message ??
      deletion.error?.message ??
      'Une erreur est survenue, merci de réessayer.'

    console.log('FORM', { ...form })

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="fr-modal__body">
          <div className="fr-modal__header">
            <button
              className="fr-link--close fr-link"
              ref={closeRef}
              type="button"
              onClick={resetModal}
            >
              Fermer
            </button>
          </div>
          <div className="fr-modal__content">
            <h1 id={modalTitleId} className="fr-modal__title">
              <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
              {project.name}
            </h1>

            <InputFormField
              control={form.control}
              path="content"
              type="textarea"
              label="Note privée concernant ce projet"
            />

            {hasError ? <p className="fr-error-text">{errorMessage}</p> : null}
          </div>
          <div className="fr-modal__footer">
            <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
              <li>
                <button
                  disabled={disableButtons}
                  className="fr-btn fr-icon-checkbox-circle-line"
                  role="submit"
                >
                  Enregistrer
                </button>
              </li>
              <li>
                <button
                  disabled={disableButtons}
                  onClick={resetModal}
                  className="fr-btn  fr-btn--secondary"
                  type="button"
                >
                  Annuler
                </button>
              </li>
            </ul>
          </div>
        </div>
      </form>
    )
  },
)
