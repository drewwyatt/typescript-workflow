import type Step from './github/step'
import type { Camelize } from './utils'

export type CamelizedStep = Camelize<Step>

export const decamelize = (step: CamelizedStep): Step => {}
