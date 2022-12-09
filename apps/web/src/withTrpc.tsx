import 'client-only'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  CreateTRPCClientOptions,
  httpBatchLink,
  loggerLink,
} from '@trpc/client'
import { getUrl } from '@mec/web/utils/baseUrl'
import { trpc } from '@mec/web/trpc'
import { FunctionComponentWithChildren } from '@mec/web/utils/componentHelpers'
import { withProvider } from '@mec/web/utils/withProvider'
import { type AppRouter } from '@mec/web/trpc/trpcRouter'
import superjson from 'superjson'

// TODO make a global singleton like prisma ? So same value is used in different provider wraps
export const TrpcProvider: FunctionComponentWithChildren = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())

  const clientOptions: CreateTRPCClientOptions<AppRouter> = {
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === 'development' ||
          (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchLink({
        url: `${getUrl('/api/trpc')}`,
      }),
    ],
    // FIXME transformers make storybook stories disapear :/
    transformer: superjson,
  }

  const [trpcClient] = useState(() => trpc.createClient(clientOptions))

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

// HOC for using trpc in a subtree of client components
export const withTrpc = withProvider(TrpcProvider)
