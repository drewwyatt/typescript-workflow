import type Events from './github/events'
import type Workflow from './github/workflow'

import * as eventCreators from './events'
import { CamelizedJob, decamelize } from './job'
import type { Camelize } from './utils'

type EventObject = ReturnType<typeof eventCreators[keyof typeof eventCreators]>

type CamelizedWorkflow<Jobs extends string> = Omit<Camelize<Workflow>, 'on' | 'jobs'> & {
  on: EventObject[]
  jobs: Record<Jobs, CamelizedJob<Jobs>>
}

const mapEvents = (events: CamelizedWorkflow<any>['on']) =>
  events.reduce<Partial<Events>>((acc, event) => {
    for (let key in event) {
      acc[key as keyof typeof event] = event[key as keyof typeof event]
    }

    return acc
  }, {})

const workflow = <Jobs extends string>({
  jobs,
  on: events,
  ...workflow
}: CamelizedWorkflow<Jobs>): Workflow => {
  return {
    on: mapEvents(events),
    ...workflow,
    jobs: Object.entries(jobs).reduce<Workflow['jobs']>((acc, [id, job]) => {
      acc[id] = decamelize(job as any)
      return acc
    }, {}),
  }
}

export default workflow
