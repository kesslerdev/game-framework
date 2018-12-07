<link rel="stylesheet" type="text/css" href="mermaid.css">
<script src="mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>

# Welcome to Quarkit

Quarkit is a collection of [stamps](https://github.com/stampit-org/stamp-specification) using [stampit.js](https://stampit.js.org/api/quick-start).

The main goal is composability, for games

# See it in action

Run an example, it uses all of basic packages for running a clicker game,
some resouces, things to buy and some expressions.

```bash
# get the source
git clone git@github.com:kesslerdev/quarkit.git
cd quarkit

# bootsrap sub packages
yarn; yarn bootstrap

# go to demo
cd example/quarkit-example-node

# install & start
yarn; yarn start
```

# Example


```js
// Imports
import {
  Possessor, Purchasable,
  Resource, ResourceBag,
  Level,
  Production,
} from 'quarkit-modules'

// compose things of this game
const Currency = Resource.createQuark('Currency')

const Shop = Purchasable.compose(
  Level, Production,
).createQuark('Shop')

const Player = ResourceBag.compose(Possessor).createQuark('Player')

// finally your data
const cash = Currency({ name: 'Cash' })

const lemonStand = Shop({
    name: 'LemonStand',
    productionTime: 3000,
})
.setPurchaseCost(currencies.cash, 10)
.setLevelCost(currencies.cash, 10)
.setProduction(currencies.cash, 'this.level * 4')

// your player
const user = Player({ name: 'first' })
// give some cash for buying lemonStand
user.addResource(currencies.cash, 10)

lemonStand.purchaseFor(user) // need revert user.buy(lemonStand)

// setup gameLoop
const loop = GameLoop({ tps: 10 })// ticks per second
// load user into loop
loop.gameObjects.push(user)

// refresh cash of user every 1000/10=100ms
loop.calls.push(() => {
  console.clear()
  console.log(user.resourceBag[cash.slug])
})

// let's go 
loop.start()
```
