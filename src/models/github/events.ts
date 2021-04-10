import type { IgnorableOption, Nullable } from './utils'

type Events = {
  page_build: null

  pull_request: Nullable<IgnorableOption<'branches' | 'tags' | 'paths'>>

  push: Nullable<IgnorableOption<'branches' | 'tags' | 'paths'>>

  release: Nullable<{
    types: (
      | 'published'
      | 'unpublished'
      | 'created'
      | 'edited'
      | 'deleted'
      | 'prereleased'
      | 'released'
    )[]
  }>

  repository_dispatch: Nullable<{
    types: (
      | 'created'
      | 'deleted'
      | 'archived'
      | 'unarchived'
      | 'edited'
      | 'renamed'
      | 'transferred'
      | 'publicized'
      | 'privatized'
    )[]
  }>

  schedule: { cron: string }[]

  workflow_dispatch: Nullable<
    Record<
      string,
      {
        description: string
        required: boolean
        default?: string
      }
    >
  >
}

export default Events
