interface BaseStep {
  /**
   * A unique identifier for the step. You can use the id to reference the step in contexts. For more information, see "Context and expression syntax for GitHub Actions."
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsid
   */
  id?: string

  /**
   * You can use the if conditional to prevent a step from running unless a condition is met. You can use any supported context and expression to create a conditional.
   *
   * When you use expressions in an if conditional, you may omit the expression syntax (${{ }}) because GitHub automatically evaluates the if conditional as an expression, unless the expression contains any operators. If the expression contains any operators, the expression must be contained within ${{ }} to explicitly mark it for evaluation. For more information, see "Context and expression syntax for GitHub Actions."
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsif
   */
  if?: string

  /**
   * A name for your step to display on GitHub.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsname
   */
  name?: string

  /**
   * A map of the input parameters defined by the action. Each input parameter is a key/value pair. Input parameters are set as environment variables. The variable is prefixed with INPUT_ and converted to upper case.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith
   */
  with?: Record<string, string>

  /**
   * Sets environment variables for steps to use in the runner environment. You can also set environment variables for the entire workflow or a job. For more information, see env and jobs.<job_id>.env.
   *
   * When more than one environment variable is defined with the same name, GitHub uses the most specific environment variable. For example, an environment variable defined in a step will override job and workflow variables with the same name, while the step executes. A variable defined for a job will override a workflow variable with the same name, while the job executes.
   *
   * Public actions may specify expected environment variables in the README file. If you are setting a secret in an environment variable, you must set secrets using the secrets context. For more information, see "Using environment variables" and "Context and expression syntax for GitHub Actions."
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsenv
   */
  env?: Record<string, string>

  /**
   * Prevents a job from failing when a step fails. Set to true to allow a job to pass when this step fails.
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error
   */
  'continue-on-error'?: boolean
}

interface RunStep extends BaseStep {
  /**
   * Runs command-line programs using the operating system's shell. If you do not provide a name, the step name will default to the text specified in the run command.
   *
   * Commands run using non-login shells by default. You can choose a different shell and customize the shell used to run commands. For more information, see "Using a specific shell."
   *
   * Each run keyword represents a new process and shell in the runner environment. When you provide multi-line commands, each line runs in the same shell.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun
   */
  run: string

  /**
   * Using the working-directory keyword, you can specify the working directory of where to run the command.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun
   */
  'working-directory'?: string

  /**
   * You can override the default shell settings in the runner's operating system using the shell keyword. You can use built-in shell keywords, or you can define a custom set of shell options.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun
   */
  shell?: 'bash' | 'pwsh' | 'python' | 'sh' | 'cmd' | 'powershell'
}

interface UsesStep extends BaseStep {
  /**
   * Selects an action to run as part of a step in your job. An action is a reusable unit of code. You can use an action defined in the same repository as the workflow, a public repository, or in a published Docker container image.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsuses
   */
  uses: string
}

type Step = RunStep | UsesStep
export default Step
