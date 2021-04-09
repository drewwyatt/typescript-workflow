import { dump } from 'js-yaml'
import type { Workflow } from 'models'

export const toYaml = (workflow: Workflow): string => dump(workflow)
