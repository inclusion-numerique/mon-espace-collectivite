import { create } from 'zustand'
import { Scope } from '@mec/web/scope'

type ProjectNoteModalStoreState = {
  open: boolean
  projectNote: { id: string; content: string } | null
  project: { id: string; name: string } | null
  scope: Scope | null
  // Project notes after create/update operations Indexed by project id
  updatedProjectNotes: Record<string, { id: string; content: string } | null>
  setProjectNote: (
    projectId: string,
    projectNote: { id: string; content: string } | null,
  ) => void
  createProjectNote: (input: {
    project: { id: string; name: string }
    scope: Scope
  }) => void
  updateProjectNote: (input: {
    projectNote: { id: string; content: string }
    project: { id: string; name: string }
  }) => void
  resetModal: () => void
  resetUpdatedProjectNotes: () => void
}
export const useProjectNoteModalStore = create<ProjectNoteModalStoreState>(
  (set) => ({
    updatedProjectNotes: {},
    open: false,
    projectNote: null,
    project: null,
    scope: null,
    createProjectNote: ({ project, scope }) =>
      set({ open: true, project, scope, projectNote: null }),
    updateProjectNote: ({ project, projectNote }) =>
      set({ open: true, project, projectNote }),
    resetModal: () =>
      set({
        open: false,
        projectNote: null,
        project: null,
        scope: null,
      }),
    resetUpdatedProjectNotes: () =>
      set({
        updatedProjectNotes: {},
      }),
    setProjectNote: (projectId, projectNote) =>
      set((state) => ({
        updatedProjectNotes: {
          ...state.updatedProjectNotes,
          [projectId]: projectNote,
        },
      })),
  }),
)
