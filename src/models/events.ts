import type Events from './github/events'

const toStandardEventBuilder = <Key extends keyof Events>(key: Key) => (
  options?: Events[Key],
) => ({ [key]: options ?? null } as Pick<Events, Key>)

export const schedule = (
  crontab: string,
  ...additional: string[]
): Pick<Events, 'schedule'> => ({
  schedule: [crontab, ...additional].map(cron => ({ cron })),
})

export const pageBuild = toStandardEventBuilder('page_build')
export const pullRequest = toStandardEventBuilder('pull_request')
export const push = toStandardEventBuilder('push')
export const release = toStandardEventBuilder('release')
export const repositoryDispatch = toStandardEventBuilder('repository_dispatch')
export const workflowDispatch = toStandardEventBuilder('workflow_dispatch')
