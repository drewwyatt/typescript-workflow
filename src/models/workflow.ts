import type Workflow from './github/workflow'
import { CamelizedJob, decamelize } from './job'
import type { Camelize } from './utils'

type CamelizedWorkflow = Omit<Camelize<Workflow>, 'jobs'> & {
  jobs: Record<string, CamelizedJob>
}

const workflow = ({ jobs, ...workflow }: CamelizedWorkflow): Workflow => {
  return {
    ...workflow,
    jobs: Object.entries(jobs).reduce<Workflow['jobs']>((acc, [id, job]) => {
      acc[id] = decamelize(job)
      return acc
    }, {}),
  }
}

export default workflow
