import { inspect } from 'util'
import { Player, Resources, Shops } from './types'
import { GameClient } from './gameclient'

console.log('First Buy Shops=========================')

const client = new GameClient(Player)

// buy lemon stand for player
client.buyShop(Shops.LemonStand)
client.buyShop(Shops.NewsPaperDelivery)
