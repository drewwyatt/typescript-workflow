type InputDescriptor = {
  description: string
  required: boolean
  default?: string
}

type RepositoryDispatchEvent =
  | 'created'
  | 'deleted'
  | 'archived'
  | 'unarchived'
  | 'edited'
  | 'renamed'
  | 'transferred'
  | 'publicized'
  | 'privatized'

export const schedule = (crontab: string, ...additional: string[]) =>
  ({
    name: 'schedule',
    options: [crontab, ...additional].map(cron => ({ cron })),
  } as const)

export const workflowDispatch = (inputs?: Record<string, InputDescriptor>) =>
  ({
    name: 'workflow_dispatch',
    options: inputs,
  } as const)

export const repositoryDispatch = (...events: RepositoryDispatchEvent[]) => ({
  name: 'repository_dispatch',
  options: events.length > 0 ? { types: events } : undefined,
})

export const push = (...branches: string[]) =>
  ({
    name: 'push',
    options: branches.length > 0 ? { branches } : undefined,
  } as const)

export const pullRequest = (...branches: string[]) =>
  ({
    name: 'pull_request',
    options: branches.length > 0 ? { branches } : undefined,
  } as const)
