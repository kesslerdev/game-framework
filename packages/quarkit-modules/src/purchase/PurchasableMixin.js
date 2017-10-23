import { Mixin, mix } from 'quarkit-mixin'
import { CostMixin } from '../cost'
import { StateProviderMixin, StatefullMixin } from '../stateful'

export const PurchasableMixin = Mixin((superclass) =>
class extends mix(superclass).with(CostMixin) {
  canPurchaseFor(owner) {
    return this.DefaultCost.every((cost) =>
      owner.getResourceSlot(cost.Resource).Amount >= cost.Amount
    )
  }

  purchaseFor(owner) {
    if (!this.canPurchaseFor(owner)) {
      throw new Error('cannot purchase pas la monnaie')
    }

    this.DefaultCost.map((cost) => {
      console.log(`- ${cost.Amount} ${cost.Resource.slug}`)
      return owner.decraseResource(cost.Resource, cost.Amount)
    })

    return this.applyFor(owner)
  }

  applyFor(owner) {
    const act = owner.createPossessionAct(this)
    if (act.Possession instanceof StatefullMixin && owner instanceof StateProviderMixin) {
      act.Possession.withState(owner, false)
    }
    owner.Possessions.push(act)
    return this
  }
})
