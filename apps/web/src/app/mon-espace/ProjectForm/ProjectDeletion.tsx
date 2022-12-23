'use client'

import { Project } from '@prisma/client'
import { trpc } from '@mec/web/trpc'
import { useRouter } from 'next/navigation'

export const ProjectDeletion = ({
  project: { id },
}: {
  project: Pick<Project, 'id'>
}) => {
  const deletion = trpc.project.delete.useMutation()
  const disableButtons = deletion.isLoading || deletion.isSuccess
  const router = useRouter()
  const onConfirm = () => {
    deletion.mutateAsync({ id }).then(() => {
      router.push('/mon-espace')
    })
  }

  return (
    <>
      <button
        className="fr-link fr-py-2v"
        data-fr-opened="false"
        aria-controls="fr-modal-project-deletion-confirm"
        data-fr-js-modal-button="true"
        style={{ textDecoration: 'underline' }}
      >
        Supprimer le projet
      </button>
      <dialog
        aria-labelledby="fr-modal-project-deletion-confirm-title"
        id="fr-modal-project-deletion-confirm"
        className="fr-modal"
        role="dialog"
      >
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button
                    disabled={disableButtons}
                    className="fr-link--close fr-link"
                    aria-controls="fr-modal-project-deletion-confirm"
                    data-fr-js-modal-button="true"
                  >
                    Fermer
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1
                    id="fr-modal-project-deletion-confirm-title"
                    className="fr-modal__title"
                  >
                    <span className="fr-fi-arrow-right-line fr-fi--lg"></span>
                    Êtes-vous sûr de vouloir supprimer ce projet ?
                  </h1>
                  <p>
                    Si vous supprimez ce projet, vous perdrez les informations
                    liés à ce projet et il ne sera plus visible dans votre
                    espace collectivité.
                  </p>
                  {deletion.isError ? (
                    <p className="fr-error-text">
                      {deletion.error?.message ??
                        'Une erreur est survenue, merci de réessayer.'}
                    </p>
                  ) : null}
                </div>
                <div className="fr-modal__footer">
                  <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                    <li>
                      <button
                        disabled={disableButtons}
                        className="fr-btn fr-icon-delete-bin-line"
                        onClick={onConfirm}
                      >
                        Supprimer
                      </button>
                    </li>
                    <li>
                      <button
                        disabled={disableButtons}
                        aria-controls="fr-modal-project-deletion-confirm"
                        className="fr-btn  fr-btn--secondary"
                        data-fr-js-modal-button="true"
                      >
                        Annuler
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
