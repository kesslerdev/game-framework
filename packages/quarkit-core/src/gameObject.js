import { Mixin, mix } from 'quarkit-mixin'
import getGOReference from './utils/reference'
import PropertyMixin from './mixins/property-mixin'
import EmitterMixin from './mixins/emitter-mixin'
import CacheMixin from './mixins/cache-mixin'
import LoopEntryMixin from './mixins/loop-entry-mixin'

export const GameObjectMixin = Mixin((superclass) => class extends mix(superclass).with(EmitterMixin, LoopEntryMixin, CacheMixin, PropertyMixin) {

  constructor(...args) {
    // mixins should either 1) not define a constructor, 2) require a specific
    // constructor signature, or 3) pass along all arguments.
    super(...args)
    this.slug = args[0]
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
