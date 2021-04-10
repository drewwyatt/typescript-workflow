import type Container from './container'
import type Step from './step'
import type Strategy from './strategy'

interface Job {
  /**
   * The name of the job displayed on GitHub.
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idname
   */
  name?: string

  /**
   * Identifies any jobs that must complete successfully before this job will run. It can be a string or array of strings. If a job fails, all jobs that need it are skipped unless the jobs use a conditional expression that causes the job to continue.
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idneeds
   */
  needs?: string | string[] // TODO: can we infer sibling job ids

  /**
   * The type of machine to run the job on. The machine can be either a GitHub-hosted runner or a self-hosted runner.
   *
   * GitHub-hosted runners
   *
   * If you use a GitHub-hosted runner, each job runs in a fresh instance of a virtual environment specified by runs-on.
   *
   * Available GitHub-hosted runner types are:
   *
   * Virtual environment	| YAML workflow label
   * Windows Server 2019	| windows-latest or windows-2019
   * Ubuntu 20.04	        | ubuntu-latest or ubuntu-20.04
   * Ubuntu 18.04	        | ubuntu-18.04
   * Ubuntu 16.04	        | ubuntu-16.04
   * macOS Big Sur 11.0	  | macos-11.0
   * macOS Catalina 10.15	| macos-latest or macos-10.15
   *
   * Self-hosted runners
   *
   * To specify a self-hosted runner for your job, configure runs-on in your workflow file with self-hosted runner labels.
   *
   * All self-hosted runners have the self-hosted label, and you can select any self-hosted runner by providing only the self-hosted label. Alternatively, you can use self-hosted in an array with additional labels, such as labels for a specific operating system or system architecture, to select only the runner types you specify.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on
   */
  'runs-on':
    | 'windows-latest'
    | 'windows-2019'
    | 'ubuntu-latest'
    | 'ubuntu-20.04'
    | 'ubuntu-18.04'
    | 'macos-11.0'
    | 'macos-latest'
    | 'macos-10.15'
    | 'self-hosted'
    | ['self-hosted', string]

  /**
   * The environment that the job references. All environment protection rules must pass before a job referencing the environment is sent to a runner. For more information, see "Environments."
   *
   * You can provide the environment as only the environment name, or as an environment object with the name and url. The URL maps to environment_url in the deployments API. For more information about the deployments API, see "Deployments."
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idenvironment
   */
  environment?: string | { name: string; url: string }

  /**
   * A map of outputs for a job. Job outputs are available to all downstream jobs that depend on this job. For more information on defining job dependencies, see jobs.<job_id>.needs.
   *
   * Job outputs are strings, and job outputs containing expressions are evaluated on the runner at the end of each job. Outputs containing secrets are redacted on the runner and not sent to GitHub Actions.
   *
   * To use job outputs in a dependent job, you can use the needs context. For more information, see [Context and expression syntax for GitHub Actions](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#needs-context).
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idoutputs
   */
  outputs?: Record<string, string>

  /**
   * A map of default settings that will apply to all steps in the job. You can also set default settings for the entire workflow. For more information, see defaults.
   *
   * When more than one default setting is defined with the same name, GitHub uses the most specific default setting. For example, a default setting defined in a job will override a default setting that has the same name defined in a workflow.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_iddefaults
   */
  defaults?: any // TODO

  /**
   * You can use the if conditional to prevent a job from running unless a condition is met. You can use any supported context and expression to create a conditional.
   *
   * When you use expressions in an if conditional, you may omit the expression syntax (${{ }}) because GitHub automatically evaluates the if conditional as an expression, unless the expression contains any operators. If the expression contains any operators, the expression must be contained within ${{ }} to explicitly mark it for evaluation. For more information, see [Context and expression syntax for GitHub Actions](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions).
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idif
   */
  if?: string // TODO

  /**
   * The maximum number of minutes to let a job run before GitHub automatically cancels it. Default: 360
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepstimeout-minutes
   */
  'timeout-ninutes'?: number

  /**
   * A job contains a sequence of tasks called steps. Steps can run commands, run setup tasks, or run an action in your repository, a public repository, or an action published in a Docker registry. Not all steps run actions, but all actions run as a step. Each step runs in its own process in the runner environment and has access to the workspace and filesystem. Because steps run in their own process, changes to environment variables are not preserved between steps. GitHub provides built-in steps to set up and complete a job.
   *
   * You can run an unlimited number of steps as long as you are within the workflow usage limits. For more information, see "Usage limits and billing" for GitHub-hosted runners and "About self-hosted runners" for self-hosted runner usage limits.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idsteps
   */
  steps: Step[]

  /**
   * A strategy creates a build matrix for your jobs. You can define different variations to run each job in.
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategy
   */
  strategy?: Strategy

  /**
   * Prevents a workflow run from failing when a job fails. Set to true to allow a workflow run to pass when this job fails.
   *
   * You can allow specific jobs in a job matrix to fail without failing the workflow run. For example, if you wanted to only allow an experimental job with node set to 13 to fail without failing the workflow run.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idcontinue-on-error
   */
  'continue-on-error'?: boolean | string

  /**
   * A container to run any steps in a job that don't already specify a container. If you have steps that use both script and container actions, the container actions will run as sibling containers on the same network with the same volume mounts.
   *
   * If you do not set a container, all steps will run directly on the host specified by runs-on unless a step refers to an action configured to run in a container.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idcontainer
   */
  container?: Container

  /**
   * Used to host service containers for a job in a workflow. Service containers are useful for creating databases or cache services like Redis. The runner automatically creates a Docker network and manages the life cycle of the service containers.
   *
   * If you configure your job to run in a container, or your step uses container actions, you don't need to map ports to access the service or action. Docker automatically exposes all ports between containers on the same Docker user-defined bridge network. You can directly reference the service container by its hostname. The hostname is automatically mapped to the label name you configure for the service in the workflow.
   *
   * If you configure the job to run directly on the runner machine and your step doesn't use a container action, you must map any required Docker service container ports to the Docker host (the runner machine). You can access the service container using localhost and the mapped port.
   *
   * For more information about the differences between networking service containers, see "About service containers."
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idservices
   */
  services?: any // TODO
}

export default Job
