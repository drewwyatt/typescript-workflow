import * as events from './events'
import type Job from './job'
export type Event = ReturnType<typeof events[keyof typeof events]>

interface Workflow {
  /**
   * The name of your workflow. GitHub displays the names of your workflows on your repository's actions page. If you omit name, GitHub sets it to the workflow file path relative to the root of the repository.
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#name
   */
  name?: string

  /**
   * The name of the GitHub event that triggers the workflow. You can provide a single event string, array of events, array of event types, or an event configuration map that schedules a workflow or restricts the execution of a workflow to specific files, tags, or branch changes. For a list of available events, see "Events that trigger workflows."
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#on
   *
   * @example
   *
   * ```ts
   *
   * // Triggered when code is pushed to any branch in a repository
   * {
   *   on: workflowDispatch()
   * }
   *
   * // Triggers the workflow on push or pull request events
   * {
   *   on: [push(), pullRequest()]
   * }
   * ```
   */
  on: Event | Event[]

  /**
   * A map of environment variables that are available to the steps of all jobs in the workflow. You can also set environment variables that are only available to the steps of a single job or to a single step. For more information, see jobs.<job_id>.env and jobs.<job_id>.steps[*].env.
   *
   * When more than one environment variable is defined with the same name, GitHub uses the most specific environment variable. For example, an environment variable defined in a step will override job and workflow variables with the same name, while the step executes. A variable defined for a job will override a workflow variable with the same name, while the job executes.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#env
   */
  env?: Record<string, string>

  /**
   * A map of default settings that will apply to all jobs in the workflow. You can also set default settings that are only available to a job. For more information, see jobs.<job_id>.defaults.
   *
   * When more than one default setting is defined with the same name, GitHub uses the most specific default setting. For example, a default setting defined in a job will override a default setting that has the same name defined in a workflow.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#defaults
   */
  defaults?: any // TODO

  /**
   * A workflow run is made up of one or more jobs. Jobs run in parallel by default. To run jobs sequentially, you can define dependencies on other jobs using the jobs.<job_id>.needs keyword.
   *
   * Each job runs in a runner environment specified by runs-on.
   *
   * You can run an unlimited number of jobs as long as you are within the workflow usage limits. For more information, see "Usage limits and billing" for GitHub-hosted runners and "About self-hosted runners" for self-hosted runner usage limits.
   *
   * If you need to find the unique identifier of a job running in a workflow run, you can use the GitHub API. For more information, see "Workflow Jobs."
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobs
   * @see {@link Job}
   */
  jobs: Record<string, Job>
}

export default Workflow
