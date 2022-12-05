import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import * as trpcRouter from './src/trpcRouter'

export { createContext } from './src/trpcContext'
export type { AppContext } from './src/trpcContext'

// export type definition of API
export type AppRouter = typeof trpcRouter.appRouter

export const appRouter = trpcRouter.appRouter

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
