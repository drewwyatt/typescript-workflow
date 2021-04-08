interface Job {
  /**
   * The name of the job displayed on GitHub.
   */
  name?: string

  needs?: string | string[] // TODO: can we infer sibling job ids
}

export default Job
