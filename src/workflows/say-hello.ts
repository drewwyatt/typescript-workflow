import { workflow, push, pullRequest } from '../models'

export default workflow({
  name: 'CI',
  on: [pullRequest(), push({ branches: ['main'] })],
  jobs: {
    'say-hello': { runsOn: 'ubuntu-latest', steps: [{ run: 'echo "hello, world"' }] },
  },
})
