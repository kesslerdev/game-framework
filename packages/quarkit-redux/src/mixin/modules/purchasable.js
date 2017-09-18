import { Mixin, mix } from 'quarkit-mixin'
import { PurchasableMixin } from 'quarkit-modules'
import ReduxMixin from '../redux'

export const PurchasableReduxMixin = Mixin((superclass) => class extends mix(superclass).with(ReduxMixin, PurchasableMixin) {

  supportsReduce(action) {
    return false
  }

  defaultState(state = {}) {
    return state
  }

  reduce(state = this.defaultState(), action) {

  }

})
