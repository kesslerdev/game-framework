// Imports
import {
  Possessor,
  Purchasable,
  Resource,
  ResourceBag,
  Level,
  Production,
} from 'quarkit-modules'
import { GameLoop } from 'quarkit-core'

// compose things of this game
const Currency = Resource.createQuark('Currency')

const Shop = Purchasable.compose(
  Level,
  Production,
).createQuark('Shop')

const Player = ResourceBag.compose(Possessor).createQuark('Player')

// finally your data
const currencies = {
  cash: Currency({ name: 'Cash' }),
  gold: Currency({ name: 'Cash', premium: true }),
}

const shops = {
  lemonStand: Shop.implementInteropMethod('modifiers', function (
    { costList },
    ...args
  ) {
    if (costList === 'production') {
      const modifiers = []
      console.log(args)
      if (this.level > 25) modifiers.push('*25')
      if (this.level > 50) modifiers.push('*50')
      return modifiers
    }
    return []
  })({
    name: 'LemonStand',
    productionTime: 3000,
  })
    .setPurchaseCost(currencies.cash, 10)
    .setLevelCost(currencies.cash, 10)
    .setProduction(currencies.cash, 'this.level * 4'),
  newsPaperDelivery: Shop({
    name: 'NewsPaperDelivery',
    productionTime: 30000,
  })
    .setPurchaseCost(currencies.cash, 100)
    .setLevelCost(currencies.cash, 100)
    .setProduction(currencies.cash, 1),
}

const user = Player({ name: 'first' })
user.addResource(currencies.cash, 1000)
shops.lemonStand.purchaseFor(user)
for (let i = 0; i < 80; i += 1) {
  user.possessions[0].levelUp(user)
}

const loop = GameLoop({ tps: 10 })
loop.gameObjects.push(user)
loop.calls.push(() => {
  // console.clear()
  /* console.log(
    `Player user
possessions:{${user.possessions.map(p => `${p.name}[${p.level}]`).join(', ')}}
cash={${user.resourceBag[currencies.cash.slug]
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}`,
  )
  console.log(
    `gameloop[withUI]
avg[100] ={${Math.round(loop.metrics.avgExecTime * 10000) / 10000}}
max      ={${Math.round(loop.metrics.maxExecTime * 10000) / 10000}}
min      ={${Math.round(loop.metrics.minExecTime * 10000) / 10000}}
last     ={${Math.round(loop.metrics.lastExecTime * 10000) / 10000}}`,
  ) */
})

console.log(user)
console.log(user.possessions[0] === shops.lemonStand)
console.log(user.possessions[0].equals(shops.lemonStand))
console.log(user.possessions[0].equals(shops.lemonStand))

loop.start()
