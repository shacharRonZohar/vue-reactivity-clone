import { track, trigger } from './effect.js'
import { reactive } from './reactive.js'

export function ref<T>(value: T) {
  return new RefImpl(value)
}

class RefImpl<T> {
  private _value: T
  constructor(value: T) {
    this._value = value
  }

  get value() {
    track(this, 'value')
    return this._value
  }

  set value(newValue) {
    this._value = newValue
    trigger(this, 'value')
  }
}

// Vue 3 dosen't do it like this
function simpleRef<T>(value: T) {
  return reactive({ value })
}
