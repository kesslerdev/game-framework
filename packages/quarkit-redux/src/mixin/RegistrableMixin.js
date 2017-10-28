import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'
import Registry from '../utils/ReduxRegistryMixin'

export const RegistrableMixin = Mixin((superclass) =>
  class extends mix(superclass).with(GameObjectMixin) {

    constructor(...args) {
    // mixins should either 1) not define a constructor, 2) require a specific
    // constructor signature, or 3) pass along all arguments.

      super(...args)

      Registry.registerGO(this)
    }

})
