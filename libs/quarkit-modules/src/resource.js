import { omit } from 'lodash'
import ArgOverProp from '@stamp/arg-over-prop'
import { GameObject } from 'quarkit-core'
import { CostHandler } from './cost'

const Resource = GameObject.createQuark('Resource').compose(
  ArgOverProp.argOverProp({ premium: false }),
)

const ResourceBag = CostHandler.implementInteropMethod(
  'applyCostList',
  function (list, order) {
    // 1: filter applicables
    const resources = Object.values(list).filter(r => r.ref instanceof Resource)

    // 2: do the job
    resources.forEach(r => {
      if (order === 'add') this.addResource(r.ref, r.amount)
      else this.subResource(r.ref, r.amount)
    })

    // 3: omit applicables from result
    return omit(list, resources.map(r => r.ref.slug))
  },
)
  .implementInteropMethod('canApplyCostList', function (list, order) {
    if (order === 'add') return true
    // 1: filter applicables
    const resources = Object.values(list).filter(r => r.ref instanceof Resource)

    // 2: do the job
    return resources.every(r => this.getResource(r.ref) >= r.amount)
  })
  .createQuark('ResourceBag')
  .compose({
    methods: {
      addResource(res, num) {
        this.resourceBag[res.slug] = (this.resourceBag[res.slug] || 0) + num

        return this
      },
      subResource(res, num) {
        this.resourceBag[res.slug] = (this.resourceBag[res.slug] || 0) - num

        return this
      },
      getResource(resource) {
        return this.resourceBag[resource.slug] || 0
      },
    },
    init(_) {
      this.resourceBag = {}
    },
  })

export { Resource, ResourceBag }
