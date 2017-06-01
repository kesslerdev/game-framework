import { inspect } from 'util';
import { Player, Resources, Shops } from './types';


let StatedLemonStand = Shops.LemonStand.withState(Player);
let StatedNewsPaperDelivery = Shops.NewsPaperDelivery.withState(Player);

setInterval(()=>{   
    StatedLemonStand.applyProduction(Player)
    StatedNewsPaperDelivery.applyProduction(Player)
    console.log('=========================')
    //console.info(inspect(Player,true,5,true))
    console.info(inspect(StatedLemonStand.Constructors,true,10,true))
},5000);

