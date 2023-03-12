import type { TargetMap } from '../types/index.js'

const targetMap: TargetMap = new Map()
let activeEffect: (() => void) | null = null

export function effect(fn: () => void) {
  activeEffect = fn
  activeEffect()
  activeEffect = null
}

export function track(target: object, key: string) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

export function trigger(target: object, key: string) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (!dep) return
  dep.forEach(fn => fn())
}
