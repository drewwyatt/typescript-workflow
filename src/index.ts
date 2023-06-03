import type { GithubWorkflow, NormalJob } from '~/schemas/github-workflow'

export const workflow = (spec: GithubWorkflow): GithubWorkflow => spec
export const job = (spec: NormalJob): NormalJob => spec

export const run = (name: string) => (script: TemplateStringsArray) => ({
  name,
  run: script
    .flatMap(line => line.split('\n').map(l => l.trim()))
    .filter(Boolean)
    .join('\n'),
})
