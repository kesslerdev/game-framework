import { Mixin, mix } from 'quarkit-mixin'
import RegistrableMixin from './registrable'

export const ReduxMixin = Mixin((superclass) => class extends mix(superclass).with(RegistrableMixin) {

  supportsReduce(action) {
    return false
  }

  defaultState(state = {}) {
    return state
  }

  reduce(state = this.defaultState(), action) {

  }

})
