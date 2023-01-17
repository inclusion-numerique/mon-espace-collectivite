'use client'

import { Scope } from '@mec/web/scope'
import { useProjectNoteModalStore } from '@mec/web/app/mon-espace/ProjectNote/useProjectNoteModalStore'

export const ProjectNoteButton = ({
  project,
  projectNote,
  scope,
}: {
  project: { id: string; name: string }
  projectNote?: { id: string; content: string }
  scope: Scope
}) => {
  const storeProjectNote = useProjectNoteModalStore(
    (state) => state.updatedProjectNotes[project.id],
  )

  // We consider the initial project note if no update has been done
  // Else the form has updated the store and we have a different projectNote from store to display
  const updatedProjectNote =
    storeProjectNote === undefined ? projectNote : storeProjectNote

  const createProjectNote = useProjectNoteModalStore(
    (state) => state.createProjectNote,
  )
  const updateProjectNote = useProjectNoteModalStore(
    (state) => state.updateProjectNote,
  )

  const hasNote = !!updatedProjectNote

  const onClick = () => {
    if (hasNote) {
      updateProjectNote({ projectNote: updatedProjectNote, project })
      return
    }
    createProjectNote({ project, scope })
  }

  const label = hasNote ? 'Modifier la note privée' : 'Ajouter une note privée'

  return (
    <>
      <button className="fr-btn fr-btn--secondary fr-btn--sm" onClick={onClick}>
        {label}
      </button>
    </>
  )
}
