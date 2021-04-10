import { Workflow, push, pullRequest } from '../../models'

const workflow: Workflow = {
  name: 'CI',
  on: [pullRequest(), push({ branches: ['main'] })],
  jobs: {
    'say-hello': { runsOn: 'ubuntu-latest', steps: [{ run: 'echo "hello, world"' }] },
  },
}

export default workflow
