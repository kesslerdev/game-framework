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

const createShop = (name, cost, productionTime, productionAmount) => {
  const shop = ShopTemplate.createGameObject(name)
  shop.addCostSlot(Resources.Cash, cost)
  shop.ProductionBaseTime = productionTime
  shop.addProductionSlot(Resources.Cash, productionAmount)

  return shop
}

const Shops = {
  LemonStand: createShop('Lemon_Stand', 4, 1000, 1),
  NewsPaperDelivery: createShop('News_Paper_Delivery', 60, 3000, 60),
  CarWash: createShop('Car_Wash', 720, 6000, 550),
  PizzaDelivery: createShop('Pizza_Delivery', 8640, 12000, 4400),
  DonutShop: createShop('Donut_Shop', 103680, 24000, 52000),
  AnciantFabric:createShop('Anciant_Fabric', 700000, 35000, 'round(sqrt(Capitalist.innerBag[1].Amount))'),
}

export function createPlayer(name) {
    const player = Capitalist.createGameObject(name)
    player
      .addResourceSlot(Resources.Cash)
      .addResourceSlot(Resources.Gold)
      .incraseResource(Resources.Gold, 1000)
      .incraseResource(Resources.Cash, 50)

    Shops.LemonStand.applyFor(player)
    return player
  }

export { Resources, Shops }
