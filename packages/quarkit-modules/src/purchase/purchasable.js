import { Mixin,mix } from 'quarkit-mixin'
import { CostMixin } from '../cost'
import { StateProviderMixin, StatefullMixin } from '../stateful'

export const PurchasableMixin = Mixin((superclass) => class extends mix(superclass).with(CostMixin) {
  canPurchaseFor(owner) {
    return this.DefaultCost.every((cos) => {
      return owner.getResourceSlot(cos.Resource).Amount >= cos.Amount.getValue()
    })
  }

  purchaseFor(owner) {
    if(!this.canPurchaseFor(owner)) {
      throw new Error('cannot purchase pas la monnaie')
    }

    this.DefaultCost.map((cos) => {
      console.log(`- ${cos.Amount.getValue()} ${cos.Resource.slug}`)
      owner.decraseResource(cos.Resource, cos.Amount.getValue())
    })

    return this.applyFor(owner)
  }

  applyFor(owner) {
    const act = owner.createPossessionAct(this)
    if (act.Possession instanceof StatefullMixin && owner instanceof StateProviderMixin) {
      act.Possession.withState(owner,false)
    }
    owner.Possessions.push(act)
    return this
  }
})
