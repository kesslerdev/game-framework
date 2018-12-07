import ArgOverProp from '@stamp/arg-over-prop'
import { Cost, CostHandler } from './cost'

const Production = Cost.createQuark('Production')
  .compose(ArgOverProp.argOverProp({ productionTime: 1000 }))
  .implementInteropMethod('loopRelated', function (go) {
    if (go instanceof CostHandler) {
      this.applyProduction(go)
    }
  })
  .deepConf({
    production: {
      costList: 'production',
    },
  })
  .props({
    lastProductionTime: null,
  })
  .compose({
    methods: {
      setProduction(gameObject, amount) {
        return this.setCost(
          this.getQuark().getDeepConf().production.costList,
          gameObject,
          amount,
        )
      },
      getLastProductionTime() {
        if (!this.lastProductionTime) {
          this.lastProductionTime = Date.now()
        }

        return this.lastProductionTime
      },
      applyProduction(go) {
        if (!(go instanceof CostHandler)) {
          throw new Error(
            `Cannot apply production of ${this.slug} for non "CostHandler" ${
              go.slug
            }`,
          )
        }
        const productionIterations = Math.trunc(
          (Date.now() - this.getLastProductionTime()) / this.productionTime,
        )
        if (productionIterations) {
          this.lastProductionTime = Date.now()

          for (let i = 0; i < productionIterations; i += 1) {
            go.applyCostList(
              this.getCostList(
                this.getQuark().getDeepConf().production.costList,
              ),
              'add',
            )
          }
        }
      },
    },
  })

export default Production
