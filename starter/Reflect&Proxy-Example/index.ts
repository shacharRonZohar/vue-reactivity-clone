#!/usr/bin/env ts-node-esm

import { log } from '../../util/index.js'
import type { Indexable } from '../types/index.js'

const obj: Indexable = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    state: 'NY',
  },
}

// log('obj.name', obj.name)
// log(`obj['name']`, obj['name'])
// log('Reflect.get(obj, name)', Reflect.get(obj, 'name'))

const simpleProxy = new Proxy(obj, {})
// console.log(`------------------------`)
// console.log(`simpleProxy.name`, simpleProxy.name)
// simpleProxy.name = 'Jane'
// console.log(`simpleProxy.name after change`, simpleProxy.name)
// console.log('og obj', obj.name)
const uselessProxy = new Proxy(obj, {
  get() {
    console.log('useless get')
    return 'useless'
  },
  set() {
    console.log('useless set')
    return true
  },
})
// console.log(`------------------------`)
// console.log(`uselessProxy.name`, uselessProxy.name)
// uselessProxy.name = 'Jane'
// console.log(`uselessProxy.name after change`, uselessProxy.name)
// console.log('og obj', obj.name)

const simpleHandler: ProxyHandler<typeof obj> = {
  get(target, prop) {
    console.log('GET', prop)
    return target[prop]
  },
  set(target, prop, value) {
    console.log('SET', prop, value)
    target[prop] = value
    return true
  },
}
const handler: ProxyHandler<typeof obj> = {
  get(target, prop, reciever) {
    console.log('GET', prop)
    return Reflect.get(target, prop, reciever)
  },
  set(target, prop, value, reciever) {
    console.log('SET', prop, value)
    return Reflect.set(target, prop, value, reciever)
  },
}

const proxy = new Proxy(obj, simpleHandler)
console.log(`------------------------`)
console.log(`proxy.name`, proxy.name)
proxy.name = 'Jane'
console.log(`proxy.name after change`, proxy.name)
