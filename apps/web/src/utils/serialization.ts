import superjson from 'superjson'
import { SuperJSONResult } from 'superjson/dist/types'

// Helper type to obfuscate serialized data
export type Serialized<T> = { __serialized: Symbol }

export const serialize = <T>(data: T): Serialized<T> => {
  return superjson.serialize(data) as any as Serialized<T>
}

export const deserialize = <T>(data: Serialized<T>): T => {
  return superjson.deserialize(data as any as SuperJSONResult) as T
}
