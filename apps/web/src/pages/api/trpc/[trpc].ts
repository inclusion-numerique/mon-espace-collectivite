import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '@mec/web/trpc/trpcRouter'
import { createContext } from '@mec/web/trpc/trpcContext'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
