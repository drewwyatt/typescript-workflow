import { workflow, job } from '~/.'

export default workflow({
  name: 'Simple Workflow',
  on: ['push'],
  jobs: {
    'say-hello': job({
      'runs-on': 'ubuntu-latest',
      steps: [{ run: 'echo "hello, world!"' }, { run: 'echo "this is another step!"' }],
    }),
  },
})
