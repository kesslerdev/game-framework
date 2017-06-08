// Imports
import { ResourceTemplate, ShopTemplate, Capitalist } from './templates'


const Cash = new ResourceTemplate('Cash')
const Gold = new ResourceTemplate('Gold')
Gold.Premium = true

const Resources = {
    Cash , Gold
}

const LemonStand = new ShopTemplate('Lemon_Stand')
LemonStand.addCostSlot(Cash, 1)
// with upgrade lvl 2 double earnings
// upgrade price 4 for 2 4.28 for 3, 4.58 for 4, 4.90,5.24,5.61
LemonStand.ProductionBaseTime = 1000
LemonStand.addProductionSlot(Cash, '4 * (this.ProductionBaseTime / 500)')

const NewsPaperDelivery = new ShopTemplate('News_Paper_Delivery')
NewsPaperDelivery.addCostSlot(Cash, 10)
NewsPaperDelivery.ProductionBaseTime = 3000
NewsPaperDelivery.addProductionSlot(Cash, 7)

const AnciantFabric = new ShopTemplate('Anciant_Fabric')
AnciantFabric.addCostSlot(Cash, 700000)
AnciantFabric.ProductionBaseTime = 10000
AnciantFabric.addProductionSlot(Cash, 'Player.InnerBag[0].Amount')

const Shops = {
    LemonStand,
    NewsPaperDelivery,
    AnciantFabric
}

const Player = new Capitalist('Kessler')
Player
    .addResourceSlot(Cash)
    .addResourceSlot(Gold)

export {
    Resources, Shops, Player,
}
