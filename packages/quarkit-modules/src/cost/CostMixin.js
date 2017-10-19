import { Mixin, mix } from 'quarkit-mixin'
import { ExpressionContainerMixin } from '../expression'
import { ResourceMixin } from '../resource'
import { CostSlot } from './CostSlotMixin'

export const DefaultCostList = 'default'

export const CostMixin = Mixin((superclass) => class extends mix(superclass).with(ExpressionContainerMixin) {

  static get CostSlotClass() {
    return this._costSlotClass || (this._costSlotClass = CostSlot)
  }

  static set CostSlotClass(costSlotClass) {
    return this._costSlotClass = costSlotClass
  }
    // as Dictionnary
  get DefaultCost() {
    return this.getCostList(DefaultCostList)
  }

  getCostList(name) {
    if (!this.costs) {
      this.costs = {}
      this.costs[DefaultCostList] = []
    }
    if (!this.costs[name]) {
      this.costs[name] = []
    }

    return this.costs[name]
  }

  addCostSlot(resource, amount, list = DefaultCostList) {
    if (!(resource instanceof ResourceMixin)) {
      throw new Error('addCostSlot must be used with ResourceMixin')
    }
    const amountVar = this.createVariable(amount,
      (oldValue, newValue) => { this.Events.emit('costSlot:expressionProperty:update', list, resource, oldValue, newValue) })

    const costSlot = this.constructor
      .CostSlotClass.createCostSlot(resource, amountVar)

    this.getCostList(list).push(costSlot)
    return this
  }
})
