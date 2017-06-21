// Imports
import { ResourceTemplate, ShopTemplate, Capitalist } from './templates'

function getCash() {
  return (ResourceTemplate as any).create({ Slug: `Cash` })
}

const Resources = {
  get Cash() {
    return this._cash || (this._cash = getCash())
  }
}

function getLemonStand() {
  const lemonStand = new ShopTemplate('Lemon_Stand')
  lemonStand.addCostSlot(Resources.Cash, 1)
  // with upgrade lvl 2 double earnings
  // upgrade price 4 for 2 4.28 for 3, 4.58 for 4, 4.90,5.24,5.61
  lemonStand.ProductionBaseTime = 3000
  lemonStand.addProductionSlot(Resources.Cash, '4 * (1 + round(Player.InnerBag[1].Amount / 500) )')

  return lemonStand
}

function getNewsPaperDelivery(){
  const newsPaperDelivery = new ShopTemplate('News_Paper_Delivery')
  newsPaperDelivery.addCostSlot(Resources.Cash, 10)
  newsPaperDelivery.addProductionSlot(Resources.Cash, '9 * (1 + round(Player.InnerBag[1].Amount / 555) )')
  newsPaperDelivery.ProductionBaseTime = 10000

  return newsPaperDelivery

}

function getAnciantFabric() {
  const anciantFabric = new ShopTemplate('Anciant_Fabric')
  anciantFabric.addCostSlot(Resources.Cash, 700000)
  anciantFabric.ProductionBaseTime = 13000
  anciantFabric.addProductionSlot(Resources.Cash, 'Player.InnerBag[1].Amount')

  return anciantFabric
}

const Shops = {
  get LemonStand() {
    return this._lemon_stand || (this._lemon_stand = getLemonStand())
  },
  get NewsPaperDelivery() {
    return this._news_paper_delivery || (this._news_paper_delivery = getNewsPaperDelivery())
  },
  get AnciantFabric() {
    return this._anciant_fabric || (this._anciant_fabric = getAnciantFabric())
  }
}

export function createPlayer(name:string) {
  const player = (Capitalist as any).create({ Slug: name })
  player
    .addResourceSlot(Resources.Cash)


  return player
}

export {
    Resources, Shops,
}
