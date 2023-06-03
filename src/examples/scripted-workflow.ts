import type { NormalJob } from '~/schemas/github-workflow'
import { workflow, run } from '~/.'

// This would probably be imported from some shared location
const jobThatSendsANotificationOnFailure = (
  { slackChannel }: { slackChannel: string },
  job: Omit<NormalJob, 'runs-on'>,
): NormalJob => {
  job.steps?.push({
    if: '${{ failure() }}',
    uses: './actions/slack-notifier',
    with: {
      channel: slackChannel,
      token: '${{ secrets.SLACK_TOKEN }}',
    },
  })

  // force some specific runner
  ;(job as NormalJob)['runs-on'] = 'ubuntu-latest'

  return job as NormalJob
}

export default workflow({
  name: 'Scripted Workflow',
  on: 'push',
  jobs: {
    'scripted-job': jobThatSendsANotificationOnFailure(
      {
        slackChannel: '#dev-alerts',
      },
      {
        steps: [
          run('check it')`
            echo "does this work?"
            echo "this has multiple lines"
          `,
        ],
      },
    ),
  },
})
