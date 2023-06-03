import type { GithubWorkflow, NormalJob } from '~/schemas/github-workflow'

export const workflow = (spec: GithubWorkflow): GithubWorkflow => spec
export const job = (spec: NormalJob): NormalJob => spec

export default workflow({
  name: 'Simple Workflow',
  on: ['push'],
  jobs: {
    'say-hello': job({
      'runs-on': 'ubuntu-latest',
      steps: [{ run: 'echo "hello, world!"' }, { run: 'echo "this is another step!' }],
    }),
  },
})
