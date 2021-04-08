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

type IgnorableOption<Key> = Key extends string
  ? { [key in Key | `${Key}-ignore`]?: string[] }
  : never

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

export const push = (options?: IgnorableOption<'branches' | 'tags' | 'paths'>) =>
  ({
    name: 'push',
    options,
  } as const)

export const pullRequest = (options?: IgnorableOption<'branches' | 'tags' | 'paths'>) =>
  ({
    name: 'pull_request',
    options,
  } as const)
