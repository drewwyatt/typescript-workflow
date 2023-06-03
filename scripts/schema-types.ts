import * as fs from 'fs'
import { compileFromFile } from 'json-schema-to-typescript'
import { format, Paths, toLogger } from './util'

const log = toLogger('scripts/schema-types')

const main = async () => {
  log('compiling from file...')
  const types = await compileFromFile(Paths.schemas('github-workflow.json'))
  log('writing types to file...')
  fs.writeFileSync(Paths.schemas('github-workflow.d.ts'), format(types), 'utf-8')

  log('done!')
}

main()
