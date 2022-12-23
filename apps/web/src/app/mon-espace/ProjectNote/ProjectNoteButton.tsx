'use client'
import { DashboardScope } from '@mec/web/app/mon-espace/dashboard'
import { useProjectNoteModalStore } from '@mec/web/app/mon-espace/useProjectNoteModalStore'

export const ProjectNoteButton = ({
  project,
  projectNote,
  scope,
}: {
  project: { id: string; name: string }
  projectNote: { id: string; content: string } | null
  scope: DashboardScope
}) => {
  const hasNote = !!projectNote
  const createProjectNote = useProjectNoteModalStore(
    (state) => state.createProjectNote,
  )
  const updateProjectNote = useProjectNoteModalStore(
    (state) => state.updateProjectNote,
  )

  const onClick = () => {
    if (hasNote) {
      updateProjectNote({ projectNote, project })
      return
    }
    createProjectNote({ project, scope })
  }

  const label = hasNote ? 'Modifier la note privée' : 'Ajouter une note privée'

  return (
    <>
      <button className="fr-btn fr-btn--secondary" onClick={onClick}>
        {label}
      </button>
    </>
  )
}
