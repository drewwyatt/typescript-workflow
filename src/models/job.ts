import Job from './github/job'
import { CamelizedStep, decamelize as decamelizeStep } from './step'
import { CamelizedStrategy, decamelize as decamelizeStrategy } from './strategy'
import type { Camelize } from './utils'

export type CamelizedJob<Jobs extends string> = Omit<
  Camelize<Job>,
  'needs' | 'step' | 'strategy'
> & {
  needs?: Jobs[]
  steps: CamelizedStep[]
  strategy?: CamelizedStrategy
}

export const decamelize = ({
  continueOnError,
  runsOn,
  steps,
  strategy,
  timeoutMinutes,
  ...job
}: CamelizedJob<any>): Job => {
  return {
    ...job,
    'continue-on-error': continueOnError,
    'runs-on': runsOn,
    'timeout-minutes': timeoutMinutes,
    strategy: strategy && decamelizeStrategy(strategy),
    steps: steps.map(decamelizeStep),
  }
}
