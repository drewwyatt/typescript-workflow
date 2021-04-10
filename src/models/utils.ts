export type Nullable<T> = T | null

export type IgnorableOption<Key> = Key extends string
  ? { [key in Key | `${Key}-ignore`]?: string[] }
  : never
