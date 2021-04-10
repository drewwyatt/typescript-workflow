import { pullRequest, push, release } from '../models'
import { toYaml } from '../yaml'

test('I can take a snapshot of an arbitrary string', () => {
  expect(
    toYaml({
      name: 'My Sample Workflow',
      on: [
        pullRequest({ 'branches-ignore': ['foo', 'bar'], tags: ['wow'] }),
        push({ branches: ['main'] }),
        release(),
      ],
      jobs: {
        'say-hello': { runsOn: 'ubuntu-latest', steps: [{ run: 'echo "hello, world"' }] },
      },
    }),
  ).toMatchSnapshot()
})
