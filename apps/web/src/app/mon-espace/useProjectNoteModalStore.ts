import { create } from 'zustand'
import { DashboardScope } from '@mec/web/app/mon-espace/dashboard'

type ProjectNoteModalStoreState = {
  open: boolean
  projectNote: { id: string; content: string } | null
  project: { id: string; name: string } | null
  scope: DashboardScope | null
  // Project notes after create/update operations Indexed by project id
  updatedProjectNotes: Record<string, { id: string; content: string } | null>
  setProjectNote: (
    projectId: string,
    projectNote: { id: string; content: string } | null,
  ) => void
  createProjectNote: (input: {
    project: { id: string; name: string }
    scope: DashboardScope
  }) => void
  updateProjectNote: (input: {
    projectNote: { id: string; content: string }
    project: { id: string; name: string }
  }) => void
  resetModal: () => void
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
    setProjectNote: (projectId, projectNote) =>
      set((state) => ({
        updatedProjectNotes: {
          ...state.updatedProjectNotes,
          [projectId]: projectNote,
        },
      })),
  }),
)
