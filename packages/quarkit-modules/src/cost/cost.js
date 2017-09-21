import { Mixin, mix } from 'quarkit-mixin'
import { ExpressionContainerMixin } from '../expression'
import { ResourceMixin } from '../resource'

export const CostSlotMixin = Mixin((superclass) => class extends superclass {
  static createCostSlot(resource, amount) {
    const i = new this()
    i.Resource = resource
    i.Amount = amount
    return i
  }
  
  Amount
  Resource
})
  
export class CostSlot extends mix().with(CostSlotMixin) {}
  


export const DefaultCostList = 'default'

export const CostMixin = Mixin((superclass) => class extends mix(superclass).with(ExpressionContainerMixin) {

  static get CostSlotClass() {
    return this._costSlotClass || (this._costSlotClass = CostSlot)
  }

  static set CostSlotClass(costSlotClass) {
    return this._costSlotClass = costSlotClass
  }
    //as Dictionnary
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
    if(!(resource instanceof ResourceMixin)) {
      throw new Error('addCostSlot must be used with ResourceMixin')
    }
    this.getCostList(list).push(this.constructor.CostSlotClass.createCostSlot(resource, this.createVariable(amount)))
        return this
    }
})
