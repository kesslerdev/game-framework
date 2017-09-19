import { Mixin,mix } from 'quarkit-mixin'
import { CostMixin } from '../cost'
import { StateProviderMixin, StatefullMixin } from '../stateful'

export const PurchasableMixin = Mixin((superclass) => class extends mix(superclass).with(CostMixin) {
  purchaseFor(owner) {
    // TODO: do verifs if has the price
    const cost = this.DefaultCost

    cost.map((cos) => {
      console.log('check cash', cos.Resource, owner.getResourceAmount(cos.Resource), cos.Amount)
      if(owner.getResourceAmount(cos.Resource) < cos.Amount) {
        console.error('ça passe pas... tas pas les moyen ga! ')
        throw new Error('impossible')
      }
    })
    
    cost.map((cos) => {
      console.log('remove cash', cos.Resource, owner.getResourceAmount(cos.Resource), cos.Amount)
      owner.decraseResource(cos.Resource, cos.Amount)
    })

    // TODO: remove cost in resrs bag
    const act = owner.createPossessionAct(this)
    if (act.Possession instanceof StatefullMixin && owner instanceof StateProviderMixin) {
      act.Possession.withState(owner,false)
    }
    owner.Possessions.push(act)

    return this
  }
})
