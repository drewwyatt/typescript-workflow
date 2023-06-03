import * as fs from 'fs'
import yaml from 'yaml'
import simpleWorkflow from '~/examples/simple-workflow'

import { Paths, format } from './util'

const workflowFile = new yaml.Document(simpleWorkflow)

fs.writeFileSync(
  Paths.root('.github/workflows/simple-workflow.yml'),
  format(yaml.stringify(workflowFile), 'yaml'),
  'utf-8',
)
