import { effect } from './effect.js'
import { ref } from './ref.js'

export function computed<T>(getter: () => T) {
  const res = ref<T>(getter())
  effect(() => {
    res.value = getter()
  })
  return res
}
