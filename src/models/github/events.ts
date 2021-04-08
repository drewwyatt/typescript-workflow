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

type ReleaseEventTypes =
  /**
   * a release, pre-release, or draft of a release is published
   */
  | 'published'
  /**
   * a release or pre-release is deleted
   */
  | 'unpublished'
  /**
   * a draft is saved, or a release or pre-release is published without previously being saved as a draft
   */
  | 'created'
  /**
   * a release, pre-release, or draft release is edited
   */
  | 'edited'
  /**
   * a release, pre-release, or draft release is deleted
   */
  | 'deleted'
  /**
   * a pre-release is created
   */
  | 'prereleased'
  /**
   * a release or draft of a release is published, or a pre-release is changed to a release
   */
  | 'released'

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

export const release = (options?: { types?: ReleaseEventTypes }) =>
  ({
    name: 'release',
    options,
  } as const)

export const pageBuild = () => ({ name: 'page_build' } as const)
