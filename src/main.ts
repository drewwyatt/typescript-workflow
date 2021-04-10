import fs from 'fs'
import path from 'path'
import { Workflow } from './models'
import { toYaml } from './yaml'

export type Options = {
  input: string
  output: string
}

const cli = async (options: Options) => {
  try {
    console.log(`Reading file from "${options.input}"...`)
    const input = await import(options.input)
    console.log('Checking default export...')
    const workflow = input.default as Workflow
    console.log('Unpacked workflow object:')
    console.log(JSON.stringify(workflow, null, 2))
    console.log('Converting to Yaml...')
    const yaml = toYaml(workflow)
    console.log(`Writing to file "${options.output}"...`)
    fs.writeFileSync(options.output, yaml, 'utf-8')
    console.log('Done!')
  } catch (error: unknown) {
    console.log('catch!', error)
  }
}

cli({
  input: path.join(__dirname, './__tests__/e2e/ci.ts'),
  output: path.join(__dirname, './__tests__/e2e/ci.yml'),
})
