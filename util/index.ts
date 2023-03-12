import type { Indexable } from '../types/index.js'

export function log(input: string, res: any) {
  console.log(
    `INPUT: ${input}
        RESULT: `,
    res,
    '\n-->',
  )
}

export function _logProxy<T>(name: string, proxy: Indexable, prop: string, value: any) {
  console.log(`${name} Proxy`)
  console.log(`proxy.${prop}`, proxy[prop])
  proxy[prop] = value
  console.log(`proxy.${prop}`, proxy[prop])
}
