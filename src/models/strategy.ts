import type Strategy from './github/strategy'
import type { Camelize } from './utils'

export type CamelizedStrategy = Camelize<Strategy>

export const decamelize = ({
  failFast,
  maxParallel,
  ...strategy
}: CamelizedStrategy): Strategy => ({
  'fail-fast': failFast,
  'max-parallel': maxParallel,
  ...strategy,
})
