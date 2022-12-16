'use client'
import { useForm } from 'react-hook-form'
import { trpc } from '@mec/web/trpc'
import {
  ProjectNoteData,
  ProjectNoteDataValidation,
} from '@mec/web/project/projectNote'
import { useRef } from 'react'
import { InputFormField } from '@mec/web/form/InputFormField'
import { DefaultValues } from 'react-hook-form/dist/types/form'
import { withTrpc } from '@mec/web/withTrpc'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { useRouter } from 'next/navigation'

const defaultValuesFromExistingProjectNote = (
  projectNote: { id: string; content: string } | null,
  projectId: string,
): DefaultValues<ProjectNoteData> => {
  if (!projectNote) {
    return { projectId }
  }
  const { id, ...data } = projectNote

  return { projectId, ...data }
}

export const ProjectNoteForm = withTrpc(
  ({
    projectId,
    projectName,
    projectNote,
    modalTitleId,
    modalId,
  }: {
    projectId: string
    projectName: string
    projectNote: { id: string; content: string } | null
    modalId: string
    modalTitleId: string
  }) => {
    const router = useRouter()
    const form = useForm<ProjectNoteData>({
      resolver: zodResolver(ProjectNoteDataValidation),
      // reValidateMode: 'onChange',
      // mode: 'all',
      defaultValues: defaultValuesFromExistingProjectNote(
        projectNote,
        projectId,
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

    const executeMutation = (data: ProjectNoteData) => {
      const hasContent = !!data.content?.trim()
      if (!projectNote?.id) {
        if (!hasContent) {
          // Cancel creation if no content
          return
        }
        return creation.mutateAsync({ ...data })
      }

      // Delete note if no content
      if (!hasContent) {
        return deletion.mutateAsync({ id: projectNote.id })
      }

      return update.mutateAsync({ id: projectNote.id, ...data })
    }

    const onSubmit = async (data: ProjectNoteData) => {
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

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="fr-modal__body">
          <div className="fr-modal__header">
            <button
              className="fr-link--close fr-link"
              aria-controls={modalId}
              ref={closeRef}
              type="button"
            >
              Fermer
            </button>
          </div>
          <div className="fr-modal__content">
            <h1 id={modalTitleId} className="fr-modal__title">
              <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
              {projectName}
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
                  aria-controls={modalId}
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
