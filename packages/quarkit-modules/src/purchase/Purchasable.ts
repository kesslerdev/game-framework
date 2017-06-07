import { mixin } from 'quarkit-mixin'
import { IGameObject } from 'quarkit-core'
import { IPossessor } from '../quarkit-modules'

export const Purchasable = mixin('Purchasable', {
  purchaseFor(owner:IPossessor) {
    // TODO: do verifs if has the price
    const cost = this.DefaultCost
    // console.log(cost)
    // TODO: remove cost in resrs bag
    const act = owner.createPossessionAct(this)
    owner.Possessions.push(act)

    return this
  },
}, null, {
  dependencies: ['Cost'],
})

export interface IPurchasable{
  purchaseFor(owner:IPossessor) : this
}
