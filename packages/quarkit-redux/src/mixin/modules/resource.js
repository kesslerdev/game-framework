import { Mixin, mix } from 'quarkit-mixin'
import { ResourceMixin } from 'quarkit-modules'
import { ReduxMixin } from '../redux'

export const ResourceReduxMixin = Mixin((superclass) => class extends mix(superclass).with(ReduxMixin, ResourceMixin) {

  defaultState(state = {}) {
    return Object.assign(state, super.defaultState(state), {
      premium: this.premium ? true : false
    })
  }
})
