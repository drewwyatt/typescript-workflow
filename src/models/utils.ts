import type Events from './github/events'

export type Nullable<T> = T | null

export type IgnorableOption<Key> = Key extends string
  ? { [key in Key | `${Key}-ignore`]?: string[] }
  : never

type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T
    ? string
    : T extends `${infer F}_${infer R}`
    ? `${F}${Capitalize<CamelizeString<R>>}`
    : T extends `${infer F}-${infer R}`
    ? `${F}${Capitalize<CamelizeString<R>>}`
    : T
  : T

export type Camelize<T> = { [K in keyof T as CamelizeString<K>]: T[K] }
