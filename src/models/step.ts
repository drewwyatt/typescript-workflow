import type Step from './github/step'
import type { RunStep, UsesStep } from './github/step'
import type { Camelize } from './utils'

export type CamelizedStep = Camelize<Step>

const isRunStep = (step: CamelizedStep): step is Camelize<RunStep> => 'run' in step

export const decamelize = ({
  continueOnError,
  ...camelizedStep
}: CamelizedStep): Step => {
  if (isRunStep(camelizedStep)) {
    const { workingDirectory, ...step } = camelizedStep
    return {
      ...step,
      'continue-on-error': continueOnError,
      'working-directory': workingDirectory,
    }
  }

  return {
    ...camelizedStep,
    'continue-on-error': continueOnError,
  }
}
