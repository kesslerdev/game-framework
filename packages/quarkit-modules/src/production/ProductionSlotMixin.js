import { Mixin, mix } from 'quarkit-mixin'
import { ExpressionPropertyMixin } from '../expression'


export const ProductionSlotMixin = Mixin((superclass) => class extends mix(superclass).with(ExpressionPropertyMixin) {

  static createProductionSlot(resource, amount) {
    const i = new this()
    i.Resource = resource
    i.createExpression('Amount', amount)
    return i
  }
  Resource
})

export class ProductionSlot extends mix().with(ProductionSlotMixin) {}
