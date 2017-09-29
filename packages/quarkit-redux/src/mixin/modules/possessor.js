import { Mixin, mix } from 'quarkit-mixin'
import { PossessorMixin } from 'quarkit-modules'
import { ReduxMixin } from '../redux'
import { getGOReference } from '../../utils'
import { possessorReducer } from '../../reducers'
import { PURCHASE_FOR } from '../../actions'

export const PossessorReduxMixin = Mixin((superclass) => class extends mix(superclass).with(ReduxMixin, PossessorMixin) {

  supportsReduce() {
    const supports = super.supportsReduce()

    supports.push([
      [PURCHASE_FOR],
      (state, action) => action.possessor,
    ])

    return supports
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
    // return possesorReducer with usage of parent reducer
    return possessorReducer(super.reduce(state, action), action)
  }

})
