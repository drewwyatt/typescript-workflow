import { decamelizeKeys } from 'humps'
import { dump } from 'js-yaml'
import type { Event, Workflow } from './models'

const handleEvents = (eventOrEvents: Event | Event[]) => {
  const events = Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents]
  return events.reduce<Record<string, any>>((acc, event) => {
    acc[event.name] = (event as any).options ?? null
    return acc
  }, {})
}

export const toComments = (...lines: string[]) =>
  lines.map(line => `# ${line}`).join('\n')

export const toYaml = ({ on: events, ...workflow }: Workflow): string =>
  dump({
    on: handleEvents(events),
    ...decamelizeKeys(workflow, {
      separator: '-',
    }),
  })
