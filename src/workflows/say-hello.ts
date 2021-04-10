import { workflow, push } from '../models'

export default workflow({
  name: 'Say Hello!',
  on: [push()],
  jobs: {
    'say-hello': { runsOn: 'ubuntu-latest', steps: [{ run: 'echo "hello, world"' }] },
  },
})
