import { Cost, CostHandler } from './cost'

const Level = Cost.createQuark('Level')
  .deepConf({
    level: {
      costList: 'level',
    },
  })
  .props({
    level: 1,
  })
  .compose({
    methods: {
      setLevelCost(gameObject, amount) {
        return this.setCost(
          this.getQuark().getDeepConf().level.costList,
          gameObject,
          amount,
        )
      },
      canLevelUp(go) {
        if (!(go instanceof CostHandler)) {
          throw new Error(
            `${go?.slug} should be a <CostHandler> to be able to 
          check price for leveling up ${this.slug}`,
          )
        }

        return go.canApplyCostList(
          this.getCostList(this.getQuark().getDeepConf().level.costList),
        )
      },
      levelUp(go) {
        if (!this.canLevelUp(go)) {
          throw new Error('cannot upgrade pas la monnaie')
        }

        go.applyCostList(
          this.getCostList(this.getQuark().getDeepConf().level.costList),
          'sub',
        )

        this.level += 1
      },
    },
  })

export default Level
