import Job from './github/job'
import { CamelizedStep, decamelize as decamelizeStep } from './step'
import { CamelizedStrategy, decamelize as decamelizeStrategy } from './strategy'
import type { Camelize } from './utils'

export type CamelizedJob = Omit<Camelize<Job>, 'step' | 'strategy'> & {
  steps: CamelizedStep[]
  strategy: CamelizedStrategy
}

export const decamelize = ({
  continueOnError,
  runsOn,
  steps,
  strategy,
  timeoutMinutes,
  ...job
}: CamelizedJob): Job => {
  return {
    ...job,
    'continue-on-error': continueOnError,
    'runs-on': runsOn,
    'timeout-minutes': timeoutMinutes,
    strategy: decamelizeStrategy(strategy),
    steps: steps.map(decamelizeStep),
  }
}
