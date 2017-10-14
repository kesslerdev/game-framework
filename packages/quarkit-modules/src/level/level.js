import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'
import { CostMixin } from '../cost'
import { StatefullMixin } from '../stateful'

export const LevelCostList = 'level'

export const LevelMixin = Mixin((superclass) =>
class extends mix(superclass).with(GameObjectMixin, StatefullMixin, CostMixin) {

  get UpgradeCost() {
    return this.getCostList(LevelCostList)
  }

  canLevelupFor(owner) {
    return this.UpgradeCost.every((cost) =>
      owner.getResourceSlot(cost.Resource).Amount >= cost.Amount
    )
  }

  get Level() {
    return this.State.level || (this.State.level = 1)
  }

  addlevelUpCostSlot(resource, amount) {
    this.addCostSlot(resource, amount, LevelCostList)
  }
  levelUpFor(owner) {
    if (!this.canLevelupFor(owner)) {
      throw new Error('cannot upgrade pas la monnaie')
    }

    this.UpgradeCost.map((cost) => {
      console.log(`- ${cost.Amount} ${cost.Resource.slug}`)
      return owner.decraseResource(cost.Resource, cost.Amount)
    })

    return this.levelUp()
  }

  levelUp() {
    this.State.level += 1
    return this.State.level
  }
})
