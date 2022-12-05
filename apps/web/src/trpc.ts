import 'client-only'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@mec/api'

export const trpc = createTRPCReact<AppRouter>()
