interface Strategy {
  /**
   * You can define a matrix of different job configurations. A matrix allows you to create multiple jobs by performing variable substitution in a single job definition. For example, you can use a matrix to create jobs for more than one supported version of a programming language, operating system, or tool. A matrix reuses the job's configuration and creates a job for each matrix you configure.
   *
   * A job matrix can generate a maximum of 256 jobs per workflow run. This limit also applies to self-hosted runners.
   *
   * Each option you define in the matrix has a key and value. The keys you define become properties in the matrix context and you can reference the property in other areas of your workflow file. For example, if you define the key os that contains an array of operating systems, you can use the matrix.os property as the value of the runs-on keyword to create a job for each operating system. For more information, see "Context and expression syntax for GitHub Actions."
   *
   * The order that you define a matrix matters. The first option you define will be the first job that runs in your workflow.
   *
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix
   */
  matrix?: Record<string, any[]>

  /**
   * When set to true, GitHub cancels all in-progress jobs if any matrix job fails. Default: true
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategyfail-fast
   */
  'fail-fast'?: boolean

  /**
   * The maximum number of jobs that can run simultaneously when using a matrix job strategy. By default, GitHub will maximize the number of jobs run in parallel depending on the available runners on GitHub-hosted virtual machines.
   * @link https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategymax-parallel
   */
  'max-parallel'?: number
}

export default Strategy
