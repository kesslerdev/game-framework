import { Mixin, mix } from 'quarkit-mixin'
import { LevelMixin, LevelCostList } from 'quarkit-modules'
import { ReduxMixin } from '../ReduxMixin'
import { getGOReference } from '../../utils'
import { levelReducer } from '../../reducers'
import { LEVEL_UP, UPDATE_LEVEL_UP_COST, updateLevelUpCost } from '../../actions'

export const LevelReduxMixin = Mixin((superclass) =>
  class extends mix(superclass).with(ReduxMixin, LevelMixin) {

    constructor(...args) {
      super(...args)
      this.Events.on(
        'costSlot:expressionProperty:update', (list, resource, oldValue, newValue) => {
          if (list === LevelCostList) {
            this.dispatch(
              updateLevelUpCost(getGOReference(this), getGOReference(resource), newValue)
            )
          }
        },
      )
    }

    // need clean implementation
    supportsReduce() {
      const supports = super.supportsReduce()

      supports.push([
        [LEVEL_UP, UPDATE_LEVEL_UP_COST],
        (state, action) => action.upgrade,
      ])

      return supports
    }

    defaultState(state = {}) {
      // take care of usage vvvv in mixin context ;)
      return Object.assign(super.defaultState(state), {
        levelUpCost: this.UpgradeCost.map((upgradeSlot) => ({
          resource: getGOReference(upgradeSlot.Resource),
          amount: upgradeSlot.Amount,
        })),
        level: this.hasState() ? this.Level : 0,
      })
    }

    reduce(state = this.defaultState(), action) {
    // return possesorReducer with usage of parent reducer
      return levelReducer(super.reduce(state, action), action)
    }

})
