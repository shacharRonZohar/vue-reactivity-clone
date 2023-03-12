#!/usr/bin/env ts-node-esm

import { reactive } from './reactive.js'
import { computed } from './computed.js'

const person = reactive({
  greeting: 'Hello',
  fullname: 'John Doe',
})

const msg = computed(() => `${person.greeting} ${person.fullname}`)

const product = reactive({
  price: 10,
  quantity: 3,
})

const salePrice = computed(() => product.price * 0.9)
const total = computed(() => salePrice.value * product.quantity)

console.log(msg)
person.fullname = 'Jane Doe'
console.log(msg)
person.greeting = 'Hi'
console.log(msg)

printProduct('Before change', { total: 27, salePrice: 9 })
product.price = 20
printProduct('After price change to 20', { total: 54, salePrice: 18 })
product.quantity = 4
printProduct('After quantity change to 4', { total: 72, salePrice: 18 })

function printProduct(title: string, expected: { total: number; salePrice: number }) {
  console.log('----------------------------------')
  console.log(title)
  console.log(`Expected - total: ${expected.total}, salePrice: ${expected.salePrice}`)
  console.log(`Actual - total: ${total.value}, salePrice: ${salePrice.value}`)
}
