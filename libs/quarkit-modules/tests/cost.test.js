import stampit from '@stamp/it'
import { GameObject } from 'quarkit-core'
import { Cost, Resource } from '../src'

const object = stampit(GameObject)({ name: 'Simple Object' })

const Res = stampit(GameObject, Resource)
const Product = stampit(GameObject, Cost)
const cash = Res({ name: 'Cash' })
const gold = Res({ name: 'Gold', premium: true })

const productA = Product({ name: 'ProductA' })
  .setCost('price', cash, 500)
  .setCost('price', gold, 5)
const productB = Product({ name: 'ProductB' })
  .setCost('price', cash, 900)
  .setCost('price', gold, 10)
  .setCost('price', object, 1)

describe('Cost list', () => {
  test('2 products 2 curreny price list', () => {
    expect(productA.slug).toBe('ProductA::Cost<Expr,GameObject,Interop,Quark>')
    expect(productA.costLists.price[cash.slug]).toBe(500)
    expect(productA.costLists.price[gold.slug]).toBe(5)
    expect(productB.costLists.price[cash.slug]).toBe(900)
    expect(productB.costLists.price[gold.slug]).toBe(10)
    expect(productB.costLists.price[object.slug]).toBe(1)
  })

  test('get cost list', () => {
    expect(productA.getCostList('price')[cash.slug].amount).toBe(500)
    expect(productA.getCostList('price')[cash.slug].ref).toBe(cash)
    expect(() => {
      productA.getCostList('wtf')
    }).toThrow()
  })

  test('expr', () => {
    const productC = Product({ name: 'ProductC' })
    productC.setCost('price', cash, 'this.name.length')
    // get interpolated value
    expect(productC.getCostList('price')[cash.slug].amount).toBe(
      productC.name.length,
    )
  })
})
