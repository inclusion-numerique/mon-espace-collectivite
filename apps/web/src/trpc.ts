import 'client-only'
import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '@mec/api'

export const trpc = createTRPCReact<AppRouter>()
