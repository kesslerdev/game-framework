//Imports
import { ResourceTemplate, ShopTemplate, Capitalist } from './templates'


let Cash = new ResourceTemplate('Cash')
let Gold = new ResourceTemplate('Gold')
Gold.Premium = true;

let Resources = {
    Cash , Gold
}

let LemonStand = new ShopTemplate('Lemon_Stand')
//with upgrade lvl 2 double earnings
//upgrade price 4 for 2 4.28 for 3, 4.58 for 4, 4.90,5.24,5.61
LemonStand.ProductionBaseTime = 1000
LemonStand.addProductionSlot(Cash, '4 * (this.ProductionBaseTime / 500)')

let NewsPaperDelivery = new ShopTemplate('News_Paper_Delivery')
NewsPaperDelivery.ProductionBaseTime = 3000
NewsPaperDelivery.addProductionSlot(Cash, 7)

let Shops = {
    LemonStand,
    NewsPaperDelivery
}

let Player = new Capitalist('Kessler')
Player
    .addResourceSlot(Cash)
    .addResourceSlot(Gold);

export {
    Resources, Shops, Player
}