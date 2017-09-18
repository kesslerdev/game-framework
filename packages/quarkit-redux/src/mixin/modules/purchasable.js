import { Mixin, mix } from 'quarkit-mixin'
import { PurchasableMixin } from 'quarkit-modules'
import { ReduxMixin } from '../redux'

export const PurchasableReduxMixin = Mixin((superclass) => class extends mix(superclass).with(ReduxMixin, PurchasableMixin) {

  defaultState(state = {}) {
    return Object.assign(state, super.defaultState(state), {
      purchasable: true
    })
  }
})
