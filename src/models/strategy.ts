import type Strategy from './github/strategy'
import type { Camelize } from './utils'

export type CamelizedStrategy = Camelize<Strategy>

export const decamelize = (step: CamelizedStrategy): Strategy => {}
