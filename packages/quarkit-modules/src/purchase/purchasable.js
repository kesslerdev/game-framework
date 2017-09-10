import { Mixin,mix } from 'quarkit-mixin'
import { CostMixin } from '../cost'
import { StateProviderMixin, StatefullMixin } from '../stateful'

export const PurchasableMixin = Mixin((superclass) => class extends mix(superclass).with(CostMixin) {
  purchaseFor(owner) {
    // TODO: do verifs if has the price
    const cost = this.DefaultCost
    // TODO: remove cost in resrs bag
    const act = owner.createPossessionAct(this)
    if (act.Possession instanceof StatefullMixin && owner instanceof StateProviderMixin) {
      act.Possession.withState(owner,false)
    }
    owner.Possessions.push(act)

    return this
  }
})
