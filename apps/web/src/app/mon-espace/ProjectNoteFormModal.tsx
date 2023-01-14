'use client'

import { useProjectNoteModalStore } from '@mec/web/app/mon-espace/useProjectNoteModalStore'
import { ProjectNoteForm } from '@mec/web/app/mon-espace/ProjectNote/ProjectNoteForm'

export const ProjectNoteFormModal = () => {
  const modalId = `project-node-form-modal`
  const modalTitleId = `project-node-form-modal-title`

  const { open, projectNote, project, scope } = useProjectNoteModalStore()

  return (
    <>
      <dialog
        aria-labelledby={modalTitleId}
        open={open}
        aria-modal="true"
        id={modalId}
        className={`fr-modal ${open ? 'fr-modal--opened' : ''}`}
        role="dialog"
        data-fr-js-modal="true"
      >
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
              {open ? (
                <ProjectNoteForm
                  project={project}
                  projectNote={projectNote}
                  modalId={modalId}
                  modalTitleId={modalTitleId}
                  scope={scope}
                />
              ) : null}
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
