import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter, createContext } from '@mec/api'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
