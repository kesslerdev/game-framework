import { Cost, CostHandler } from './cost'

const Possessor = CostHandler.createQuark('Possessor')
  .implementInteropMethod('getRelated', function () {
    return this.possessions
  })
  .props({
    possessions: [],
  })
  .methods({
    addPosession(go) {
      this.possessions.push(go)
    },
  })

const Purchasable = Cost.createQuark('Purchasable')
  .deepConf({
    purchase: {
      costList: 'price',
    },
  })
  .methods({
    setPurchaseCost(gameObject, amount) {
      return this.setCost(
        this.getQuark().getDeepConf().purchase.costList,
        gameObject,
        amount,
      )
    },
    canPurchaseFor(go) {
      if (!(go instanceof Possessor)) {
        throw new Error(
          `Cannot check purchase ${this.slug} for non "Possessor" ${go.slug}`,
        )
      }
      const cost = this.getCostList(
        this.getQuark().getDeepConf().purchase.costList,
      )

      return go.canApplyCostList(cost, 'sub')
    },
    purchaseFor(go) {
      if (!this.canPurchaseFor(go)) {
        throw new Error('cannot purchase pas la monnaie')
      }
      go.applyCostList(
        this.getCostList(this.getQuark().getDeepConf().purchase.costList),
        'sub',
      )

      go.addPosession(this.clone())
    },
  })

export { Possessor, Purchasable }
