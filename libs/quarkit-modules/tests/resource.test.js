import stampit from '@stamp/it'
import { GameObject } from 'quarkit-core'
import { Resource, ResourceBag } from '../src'

const Player = stampit(GameObject, ResourceBag).createQuark('Player')
const Res = stampit(GameObject, Resource).createQuark('Currency')
const cash = Res({ name: 'Cash' })
const gold = Res({ name: 'Gold', premium: true, quality: 5 })

describe('Resource', () => {
  test('Not premium by default', () => {
    expect(cash.premium).toBe(false)
    expect(cash.slug).toBe('Cash::Currency<Resource,GameObject,Interop,Quark>')
  })

  test('Can be premium', () => {
    expect(gold.premium).toBe(true)
    // not in argOverProp arg
    expect(gold.quality).toBe(undefined)
  })
})

describe('ResourceBag', () => {
  const kessler = Player({ name: 'kessler' })

  test('All resources to 0 by default', () => {
    expect(kessler.slug).toBe(
      'Kessler::Player<ResourceBag,CostHandler,GameObject,Interop,Quark>',
    )
    expect(kessler.getResource(cash)).toBe(0)
    expect(kessler.getResource(gold)).toBe(0)
  })

  const otherdev = Player({ name: 'otherdev' })
  test('2 Ressources bags works fine', () => {
    expect(kessler.addResource(cash, 500).getResource(cash)).toBe(500)
    expect(otherdev.subResource(cash, 300).getResource(cash)).toBe(-300)
    expect(kessler.resourceBag[cash.slug]).toBe(500)
    expect(otherdev.resourceBag[cash.slug]).toBe(-300)
    expect(otherdev instanceof GameObject).toBe(true)
  })

  test('applyCostList', () => {
    const newPlayer = Player({ name: 'newPlayer' }).addResource(cash, 500)
    const costList = {
      [cash.slug]: {
        ref: cash,
        amount: 300,
      },
    }

    const costResults = newPlayer.applyCostList(costList, 'sub')
    expect(newPlayer.getResource(cash)).toBe(200)
    expect(costResults).toMatchObject({})
    newPlayer.applyCostList(costList, 'add')
    expect(newPlayer.getResource(cash)).toBe(500)
  })
})
