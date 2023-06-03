import * as fs from 'fs'
import * as path from 'path'
import prettier from 'prettier'
const prettierConfig = require('../.prettierrc.json')

export const toLogger = (namespace: unknown, previousNamespaces: unknown[] = []) => {
  const combined = [...previousNamespaces, namespace]
  const ns = `[${combined.join('][')}]`

  return (...args: unknown[]) => {
    console.log(ns, ...args)
    return toLogger(args.join(' '), combined)
  }
}

export const Paths = {
  root: (...args: string[]) => path.join(__dirname, '../', ...args),
  scripts: (...args: string[]) => path.join(__dirname, ...args),
  schemas: (...args: string[]) => path.join(__dirname, '../src/schemas', ...args),
}

// const prettierConfig = JSON.parse(
//   fs.readFileSync(Paths.root('.prettierrc.json'), 'utf-8'),
// )

type PrettierOptions = Exclude<Parameters<(typeof prettier)['format']>[1], undefined>
export const format = (data: string, parser: PrettierOptions['parser'] = 'typescript') =>
  prettier.format(data, { ...prettierConfig, parser })
