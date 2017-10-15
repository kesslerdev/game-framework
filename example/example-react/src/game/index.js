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
  Cash: getCash(),
  Gold: getGold(),
}

const createShop = (name, cost, productionTime, productionAmount, resource = Resources.Cash) => {
  const shop = ShopTemplate.createGameObject(name)
  shop.addCostSlot(resource, cost)
  shop.addlevelUpCostSlot(Resources.Cash, `this.Level * ${cost}`)
  shop.ProductionBaseTime = productionTime
  shop.addProductionSlot(Resources.Cash, `this.Level * ${productionAmount}`)

  shop.Log.setDefaultLevel('debug')

  return shop
}

const createPremiumShop = (name, cost, productionTime, productionAmount) => {
  return createShop(name, cost, productionTime, productionAmount, Resources.Gold)
}

const Shops = {
  LemonStand: createShop('Lemon_Stand', 4, 1000, 1),
  NewsPaperDelivery: createShop('News_Paper_Delivery', 60, 3000, 60),
  CarWash: createShop('Car_Wash', 720, 6000, 550),
  PizzaDelivery: createShop('Pizza_Delivery', 8640, 12000, 4400),
  FabrikDeVodka: createShop('Fabrik_De_Vodka', 15000, 10000, '(this.Level * round(sqrt(Capitalist.innerBag[1].Amount)))'),
  DonutShop: createShop('Donut_Shop', 103680, 24000, 52000),
  AnciantFabric:createPremiumShop('Anciant_Fabric', 500, 35000, 'round(sqrt(Capitalist.innerBag[1].Amount))'),
}

export function createPlayer(name) {
    const player = Capitalist.createGameObject(name)
    player
      .addResourceSlot(Resources.Cash)
      .addResourceSlot(Resources.Gold)
      .incraseResource(Resources.Gold, 1000)
      .incraseResource(Resources.Cash, 50)

    Shops.LemonStand.applyFor(player)
    player.Log.setDefaultLevel('debug')
    return player
  }

export { Resources, Shops }
