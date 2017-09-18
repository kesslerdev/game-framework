import { Mixin, mix } from 'quarkit-mixin'
import { PosessorMixin } from 'quarkit-modules'
import ReduxMixin from '../redux'
import {getGOReference} from '../../utils'

export const PosessorReduxMixin = Mixin((superclass) => class extends mix(superclass).with(ReduxMixin, PosessorMixin) {

  supportsReduce(state, action) {
    return (action.possessor.slug !== state.slug && action.possessor.typeName !== state.typeName)
      // if parent support the reduce
      || super.supportsReduce(action)
  }

  defaultState(state = {}) {
    return Object.assign(super.defaultState(state), {
      possessions: this.PossessionsObjects.map((poss) => {
        return {
          possession: getGOReference(poss),
          state: poss.withState ? poss.__state : false
        }
      })
    })
  }

  reduce(state = this.defaultState(), action) {
    // get state from parent
    state = super().reduce(state, action)

    switch (action.type) {
      case PURCHASE_FOR:
        return Object.assign({}, state, {
          possessions: [
            ...state.possessions,
            {
              possession: action.purchasable,
              state: Registry.getGO(action.purchasable).withState ? Registry.getGO(action.purchasable).__state : false
            }
          ]
        })
      default:
        return state
    }
  }

})
