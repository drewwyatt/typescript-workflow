import { pullRequest, push } from '../models'
import { toYaml } from '../yaml'

test('I can take a snapshot of an arbitrary string', () => {
  expect(
    toYaml({
      name: 'My Sample Workflow',
      on: [pullRequest(), push({ branches: ['main'] })],
      jobs: {
        'say-hello': { runsOn: 'ubuntu-latest', steps: [{ run: 'echo "hello, world"' }] },
      },
    }),
  ).toMatchSnapshot()
})
