import fs from 'fs'
import path from 'path'
import type Workflow from './models/github/workflow'
import toWorkflowYaml, { DEFAULT_COMMENTS } from './main'

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
    console.log(`Writing to file "${options.output}"...`)
    fs.writeFileSync(
      options.output,
      toWorkflowYaml(workflow, {
        comments: [
          ...DEFAULT_COMMENTS,
          `👉 To make changes to this file, see: ${path.relative(
            options.output.split('/').slice(0, -1).join('/'), // shave off filename (path.relative expects the first argument to be a directory)
            options.input,
          )}`,
        ],
      }),
      'utf-8',
    )
    console.log('Done!')
    process.exit(0)
  } catch (error: unknown) {
    console.log('catch!', error)
    process.exit(1)
  }
}

cli({
  input: path.join(__dirname, './__tests__/workflows/say-hello.ts'),
  output: path.join(__dirname, '../.github/workflows/say-hello.yml'),
})
