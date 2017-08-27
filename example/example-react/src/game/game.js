import { ResourceTemplate, ShopTemplate, Capitalist } from './templates'

function getCash() {
  return ResourceTemplate.createGameObject(`Cash`)
}

function getGold() {
  const r = ResourceTemplate.createGameObject(`Gold`)
  r.Premium = true
  
  return r
}

const Resources = {
  get Cash() {
    return this._cash || (this._cash = getCash())
  },

  get Gold() {
    return this._gold || (this._gold = getGold())
  }
}

function getLemonStand() {
  const lemonStand = ShopTemplate.createGameObject('Lemon_Stand')
  lemonStand.addCostSlot(Resources.Cash, 1)
  // with upgrade lvl 2 double earnings
  // upgrade price 4 for 2 4.28 for 3, 4.58 for 4, 4.90,5.24,5.61
  lemonStand.ProductionBaseTime = 3000
  lemonStand.addProductionSlot(Resources.Cash, 4)

  return lemonStand
}

function getNewsPaperDelivery(){
  const newsPaperDelivery = ShopTemplate.createGameObject('News_Paper_Delivery')
  newsPaperDelivery.addCostSlot(Resources.Cash, 10)
  newsPaperDelivery.addProductionSlot(Resources.Cash, 9)
  newsPaperDelivery.ProductionBaseTime = 10000

  return newsPaperDelivery

}

function getAnciantFabric() {
  const anciantFabric = ShopTemplate.createGameObject('Anciant_Fabric')
  anciantFabric.addCostSlot(Resources.Cash, 700000)
  anciantFabric.ProductionBaseTime = 35000
  anciantFabric.addProductionSlot(Resources.Cash, 'round(sqrt(Capitalist.innerBag[1].Amount))')

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

export function createPlayer(name) {
  
    // use promise & return
    const player = Capitalist.createGameObject(name)
    player
      .addResourceSlot(Resources.Cash)
      .addResourceSlot(Resources.Gold)

    return player
  }

export { Resources, Shops }