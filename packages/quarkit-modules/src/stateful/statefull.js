import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'
import { StateProviderMixin } from './state-provider'

export const StatefullMixin = Mixin((superclass) => class extends GameObjectMixin(superclass) {

  hasState() {
    return this.__state !== undefined
  }

  get State() {
    if (!this.__state) {
      throw new Error('unable to use an Uninitialized State please call withState() before')
    }

    return this.__state
  }

  withState(stateProvider) {
    if(!(stateProvider instanceof StateProviderMixin)) {
      throw new Error('addCostSlot must be used with ResourceMixin')
    }
    this.__state = stateProvider.getState(this.stateKeyAccessor())
    this.Events.emit('set:stateprovider', stateProvider)

    return this
  }

  stateKeyAccessor() {
    if (!this.StateKey) throw new Error('please redefine get StateKey() in your stateful')
    return this.StateKey
  }

})

export class StatefullGameObject extends mix().with(StatefullMixin) {
  get StateKey() {
        return this.constructor.name + '#' + this.slug
    }
}
