import { Mixin, mix } from 'quarkit-mixin'
import { getGOReference } from '../utils'
import { RegistrableMixin } from './registrable'

export const ReduxMixin = Mixin((superclass) => class extends mix(superclass).with(RegistrableMixin) {

  supportsReduce(state, action) {
    return false
  }

  defaultState(state = {}) {
    return Object.assign(state, getGOReference(this))
  }

  reduce(state = this.defaultState(), action) {
    return state
  }

  set dispatch(dispatch) {
    this.__dispatch = dispatch
  }

  get dispatch() {
    return this.__dispatch
  }

})
