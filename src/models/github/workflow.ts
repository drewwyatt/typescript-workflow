import * as events from './events'
type Event = ReturnType<typeof events[keyof typeof events]>

interface Workflow {
  /**
   * The name of your workflow. GitHub displays the names of your workflows on your repository's actions page. If you omit name, GitHub sets it to the workflow file path relative to the root of the repository.
   */
  name?: string

  /**
   * The name of the GitHub event that triggers the workflow. You can provide a single event string, array of events, array of event types, or an event configuration map that schedules a workflow or restricts the execution of a workflow to specific files, tags, or branch changes. For a list of available events, see "Events that trigger workflows."
   */
  on: Event | Event[]
}

export default Workflow
