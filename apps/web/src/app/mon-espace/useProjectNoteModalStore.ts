import create from 'zustand'
import { DashboardScope } from '@mec/web/app/mon-espace/dashboard'

type ProjectNoteModalStoreState = {
  open: boolean
  projectNote: { id: string; content: string } | null
  project: { id: string; name: string } | null
  scope: DashboardScope | null
  createProjectNote: (input: {
    project: { id: string; name: string }
    scope: DashboardScope
  }) => void
  updateProjectNote: (input: {
    projectNote: { id: string; content: string }
    project: { id: string; name: string }
  }) => void
  reset: () => void
}
export const useProjectNoteModalStore = create<ProjectNoteModalStoreState>(
  (set) => ({
    open: false,
    projectNote: null,
    project: null,
    scope: null,
    createProjectNote: ({ project, scope }) =>
      set({ open: true, project, scope, projectNote: null }),
    updateProjectNote: ({ project, projectNote }) =>
      set({ open: true, project, projectNote }),
    reset: () =>
      set({ open: false, projectNote: null, project: null, scope: null }),
  }),
)
