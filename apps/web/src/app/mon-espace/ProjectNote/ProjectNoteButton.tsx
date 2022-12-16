import { ProjectNoteForm } from '@mec/web/app/mon-espace/ProjectNote/ProjectNoteForm'

export const ProjectNoteButton = ({
  projectId,
  projectName,
  projectNote,
}: {
  projectId: string
  projectName: string
  projectNote: { id: string; content: string } | null
}) => {
  const modalId = `project-node-modal-${projectId}`
  const modalTitleId = `${modalId}-title`
  const hasNote = !!projectNote

  return (
    <>
      <button
        className="fr-btn fr-btn--secondary"
        data-fr-opened="false"
        aria-controls={modalId}
      >
        {hasNote ? 'Modifier la note privée' : 'Ajouter une note privée'}
      </button>
      <dialog
        aria-labelledby={modalTitleId}
        id={modalId}
        className="fr-modal"
        role="dialog"
      >
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
              <ProjectNoteForm
                projectId={projectId}
                projectNote={projectNote}
                projectName={projectName}
                modalId={modalId}
                modalTitleId={modalTitleId}
              />
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
