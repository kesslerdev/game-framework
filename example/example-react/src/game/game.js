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

function getLemonStand() {
  const lemonStand = ShopTemplate.createGameObject('Lemon_Stand')
  lemonStand.addCostSlot(Resources.Cash, 4)
  // with upgrade lvl 2 double earnings
  // upgrade price 4 for 2 4.28 for 3, 4.58 for 4, 4.90,5.24,5.61
  lemonStand.addProductionSlot(Resources.Cash, 1)//x level
  lemonStand.ProductionBaseTime = 1000

  return lemonStand
}

function getNewsPaperDelivery(){
  const newsPaperDelivery = ShopTemplate.createGameObject('News_Paper_Delivery')
  newsPaperDelivery.addCostSlot(Resources.Cash, 60)
  newsPaperDelivery.addProductionSlot(Resources.Cash, 60)
  newsPaperDelivery.ProductionBaseTime = 3000

  return newsPaperDelivery
}

function getCarWash(){
  const carWash = ShopTemplate.createGameObject('Car_Wash')
  carWash.addCostSlot(Resources.Cash,720)
  carWash.addProductionSlot(Resources.Cash, 550)
  carWash.ProductionBaseTime = 6000

  return carWash
}

function getPizzaDelivery(){
  const pizzaDelivery = ShopTemplate.createGameObject('Pizza_Delivery')
  pizzaDelivery.addCostSlot(Resources.Cash, 8640)
  pizzaDelivery.addProductionSlot(Resources.Cash, 4400)
  pizzaDelivery.ProductionBaseTime = 12000

  return pizzaDelivery
}

function getDonutShop(){
  const donutShop = ShopTemplate.createGameObject('Donut_Shop')
  donutShop.addCostSlot(Resources.Cash, 103680)
  donutShop.addProductionSlot(Resources.Cash, 52000)
  donutShop.ProductionBaseTime = 24000

  return donutShop
}

function getAnciantFabric() {
  const anciantFabric = ShopTemplate.createGameObject('Anciant_Fabric')
  anciantFabric.addCostSlot(Resources.Cash, 700000)
  anciantFabric.ProductionBaseTime = 35000
  anciantFabric.addProductionSlot(Resources.Cash, 'round(sqrt(Capitalist.innerBag[1].Amount))')

  return anciantFabric
}

const Shops = {
  LemonStand: getLemonStand(),
  NewsPaperDelivery: getNewsPaperDelivery(),
  CarWash: getCarWash(),
  PizzaDelivery: getPizzaDelivery(),
  DonutShop: getDonutShop(),
  AnciantFabric: getAnciantFabric(),
}

export function createPlayer(name) {
  
    // use promise & return
    const player = Capitalist.createGameObject(name)
    player
      .addResourceSlot(Resources.Cash)
      .addResourceSlot(Resources.Gold)

    Shops.LemonStand.purchaseFor(player)
    return player
  }

export { Resources, Shops }