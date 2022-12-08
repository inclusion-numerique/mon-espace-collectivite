import 'client-only'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@mec/api'

// TODO Export mocked TRPC on storybook env variable ?
export const trpc = createTRPCReact<AppRouter>()
