import type { Indexable } from '../types/index.js'

import { track, trigger } from './effect.js'

export function reactive<T extends Indexable>(target: T) {
  const handler: ProxyHandler<T> = {
    get(target, prop, reciever) {
      //   console.log('GET', prop)
      const res = Reflect.get(target, prop, reciever)
      track(target, prop as string)
      return res
    },
    set(target, prop, value, reciever) {
      //   console.log('SET', prop, value)
      const oldVal = Reflect.get(target, prop, reciever)
      const res = Reflect.set(target, prop, value, reciever)
      if (res && oldVal !== value) {
        trigger(target, prop as string)
      }
      return res
    },
  }
  return new Proxy(target, handler)
}
