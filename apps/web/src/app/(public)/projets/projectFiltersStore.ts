import create from 'zustand'
import { District } from '@mec/web/projethoteque/legacyProjects'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { Category } from '@mec/web/anctProjects'

type FiltersState<T> = {
  initialized: boolean
  selected: Set<T>
  toggle: (district: T) => void
  reset: () => void
  router: AppRouterInstance | null
  initialize: (items: T[], router: AppRouterInstance) => void
  destroy: () => void
}

const createFilterStore = <T = string>() =>
  create<FiltersState<T>>((set) => ({
    router: null,
    initialized: false,
    selected: new Set<T>(),
    toggle: (value: T) =>
      set((state) => {
        const cloned = new Set(state.selected)
        if (cloned.has(value)) {
          cloned.delete(value)
        } else {
          cloned.add(value)
        }
        return { selected: cloned }
      }),
    reset: () => set({ selected: new Set() }),
    initialize: (values: T[], router: AppRouterInstance) =>
      set({ selected: new Set(values), initialized: true, router }),
    destroy: () =>
      set({ selected: new Set(), initialized: false, router: null }),
  }))

export const useDistrictFilters = createFilterStore<District>()

export const useCategoriesFilters = createFilterStore<Category>()
