import { inspect } from 'util'
import { Player, Resources, Shops } from './types'
import { GameClient } from './gameclient'


console.log('First Buy Shops=========================')

const client = new GameClient(Player)

client.printPlayer()

// buy lemon stand for player
client.buyShop(Shops.LemonStand)
client.buyShop(Shops.NewsPaperDelivery)
client.buyShop(Shops.AnciantFabric)

client.printPlayer()
let i = 0
setInterval(
  () => {
    process.stdout.write('\u001b[0J\u001b[1J\u001b[2J\u001b[0;0H\u001b[0;0W')

    client.printPlayer()
    i += 1

    if (i > 360) process.exit(0)

  },
  1000
)
