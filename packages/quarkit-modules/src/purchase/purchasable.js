import { Mixin,mix } from 'quarkit-mixin'
import { CostMixin } from '../cost'

export const PurchasableMixin = Mixin((superclass) => class extends mix(superclass).with(CostMixin) {
  purchaseFor(owner) {
    // TODO: do verifs if has the price
    const cost = this.DefaultCost
    // TODO: remove cost in resrs bag
    const act = owner.createPossessionAct(this)
    owner.Possessions.push(act)

    return this
  }
})
