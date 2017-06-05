console.log('TYPES PASS VVVVV=========================')

import { inspect } from 'util'
import { Player, Resources, Shops } from './types'

console.log('First Buy Shops=========================')

// buy lemon stand for player
Shops.LemonStand.purchase(Player)

console.log(inspect(Player,true,5 ,true))
console.log(inspect(Player.PossessionsObjects[0], true, 5, true))

console.log('TYPES INIT VVVVV=========================')
/*
let StatedLemonStand = Shops.LemonStand.withState(Player)
let StatedNewsPaperDelivery = Shops.NewsPaperDelivery.withState(Player)

    StatedLemonStand.applyProduction(Player)
    StatedNewsPaperDelivery.applyProduction(Player)
    
setTimeout(()=>{   
    StatedLemonStand.applyProduction(Player)
    StatedNewsPaperDelivery.applyProduction(Player)
    console.log('=========================')
    console.info(inspect(Player,true,5,true))
    /*console.info(inspect(StatedLemonStand.Context.this,true,10,true))
    console.info(inspect(StatedLemonStand.Context.stateProvider,true,10,true))
},5000);
*/
