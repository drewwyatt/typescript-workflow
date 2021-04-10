import { push, pullRequest, workflow } from '../models'

export default workflow({
  name: 'CI',
  on: [pullRequest(), push({ branches: ['main'] })],
  jobs: {
    test: {
      runsOn: 'ubuntu-latest',
      steps: [
        { uses: 'actions/checkout@v2' },
        { uses: 'actions/setup-node@v1', with: { 'node-version': '12.x' } },
        { name: 'Install Dependencies', run: 'yarn' },
        { name: 'Run Jest', run: 'yarn test' },
      ],
    },
  },
})
