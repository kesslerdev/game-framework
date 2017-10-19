import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'

export const StateGameObjectMixin = Mixin((superclass) => class extends mix(superclass).with(GameObjectMixin) {

  get StateKey() {
    return this.constructor.name + '.' + this.slug
  }

})

export class StateGameObject extends mix().with(StateGameObjectMixin) { }
