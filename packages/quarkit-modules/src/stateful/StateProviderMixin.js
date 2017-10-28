import { Mixin } from 'quarkit-mixin'

export const StateProviderMixin = Mixin((superclass) => class extends superclass {
  getState(key) {
    if (!this.internalStates) this.internalStates = {}

    return this.internalStates[key] || (this.internalStates[key] = {})
  }

})
