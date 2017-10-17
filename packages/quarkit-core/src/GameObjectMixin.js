import { Mixin, mix } from 'quarkit-mixin'
import getGOReference from './utils/getGOStringReference'
import {
  PropertyMixin,
  EmitterMixin,
  CacheMixin,
  LoopEntryMixin,
  LoggableMixin,
} from './mixins'

export const GameObjectMixin
  = Mixin((superclass) => class extends mix(superclass)
    .with(EmitterMixin, LoggableMixin, LoopEntryMixin, CacheMixin, PropertyMixin) {

      constructor(...args) {
    // mixins should either 1) not define a constructor, 2) require a specific
    // constructor signature, or 3) pass along all arguments.
        super(...args)
        this.slug = args[0]
        this.createLogger(`go#${this.slug}`)
      }

      equals(obj) {
        return obj.slug === this.slug && this.constructor.name === obj.constructor.name
      }

      static createGameObject(...args) {
        return new this(...args)
      }

      toString() {
        return getGOReference(this)
      }

})

export class GameObject extends mix().with(GameObjectMixin) {}
