import { workflow, run } from '~/.'

export default workflow({
  name: 'Scripted Workflow',
  on: 'push',
  jobs: {
    'scripted-job': {
      'runs-on': 'ubuntu-latest',
      steps: [
        run('check it')`
          echo "does this work?"
          echo "this has multiple lines"
        `,
      ],
    },
  },
})
