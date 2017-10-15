import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'
import { CostMixin } from '../cost'
import { StatefullMixin } from '../stateful'

export const LevelCostList = 'level'

export const LevelMixin = Mixin((superclass) =>
class extends mix(superclass).with(GameObjectMixin, StatefullMixin, CostMixin) {

  constructor(...args) {
    // mixins should either 1) not define a constructor, 2) require a specific
    // constructor signature, or 3) pass along all arguments.
    super(...args)

    this.createStateProperty('Level', 1)
  }

  get UpgradeCost() {
    return this.getCostList(LevelCostList)
  }

  canLevelupFor(owner) {
    return this.UpgradeCost.every((cost) =>
      owner.getResourceSlot(cost.Resource).Amount >= cost.Amount
    )
  }

  addlevelUpCostSlot(resource, amount) {
    this.addCostSlot(resource, amount, LevelCostList)
  }
  levelUpFor(owner) {
    if (!this.canLevelupFor(owner)) {
      throw new Error('cannot upgrade pas la monnaie')
    }

    this.UpgradeCost.map((cost) => {
      this.Log.debug(`- ${cost.Amount} ${cost.Resource.slug}`)
      return owner.decraseResource(cost.Resource, cost.Amount)
    })

    return this.levelUp()
  }

  levelUp() {
    this.Level += 1
    return this.Level
  }
})
