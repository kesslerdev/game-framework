import { Mixin, mix } from 'quarkit-mixin'
import { ExpressionPropertyMixin } from '../expression'

export const CostSlotMixin = Mixin((superclass) => class extends mix(superclass).with(ExpressionPropertyMixin) {
  static createCostSlot(resource, amount) {
    const i = new this()
    i.Resource = resource
    i.createExpression('Amount', amount)
    return i
  }

  Resource
})

export class CostSlot extends mix().with(CostSlotMixin) {}