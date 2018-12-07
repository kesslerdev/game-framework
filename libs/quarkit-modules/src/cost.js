import { GameObject, interopMethodTypes } from 'quarkit-core'
import { ExpressionProvider } from './expression'

const Cost = ExpressionProvider.createQuark('Cost').compose({
  methods: {
    setCost(list, gameObject, amount) {
      this.costLists[list] = {
        ...this.costLists[list],
        [gameObject.slug]:
          typeof amount === 'string'
            ? this.createExpressionResolver(amount)
            : amount,
      }

      this.costRefs = {
        ...this.costRefs,
        [gameObject.slug]: gameObject,
      }

      return this
    },
    // optional gameObject can use ther promos (provide context)
    getCostList(list, go = null) {
      if (!this.costLists[list]) throw new Error(`Cost List ${list} does not exists`)

      const amountList = this.costLists[list]
      let finalList = {}

      Object.keys(amountList).forEach(cost => {
        finalList = {
          ...finalList,
          [cost]: {
            ref: this.costRefs[cost],
            amount:
              typeof amountList[cost] === 'function'
                ? amountList[cost](
                  this.createContext(this, go),
                  this.collectModifiers(
                    {
                      go: this,
                      costList: list,
                    },
                    this,
                    go,
                  ),
                )
                : amountList[cost],
          },
        }
      })

      return finalList
    },
  },
  init(_) {
    this.costLists = {}
    this.costRefs = {}
  },
})

const CostHandler = GameObject.createQuark('CostHandler')
  .createInteropMethod('applyCostList', {
    type: interopMethodTypes.reduce,
    uniq: true,
  })
  .createInteropMethod('canApplyCostList', {
    type: interopMethodTypes.every,
    uniq: true,
  })

export { Cost, CostHandler }
