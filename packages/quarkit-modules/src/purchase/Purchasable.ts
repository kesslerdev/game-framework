import { mixin } from 'quarkit-mixin'
import { IGameObject } from 'quarkit-core'
import { IPossessor } from '../quarkit-modules'

export const Purchasable = mixin('Purchasable', {
  purchase(owner:IPossessor) {
    // TODO: do verifs
    const cost = this.DefaultCost
    console.log(cost)
    const act = owner.createPossessionAct(this)
    owner.Possessions.push(act)

    return this
  },
}, null, {
  dependencies: ['Cost'],
})

export interface IPurchasable{
  purchase(owner:IPossessor) : this
}
