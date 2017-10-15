import { Mixin } from 'quarkit-mixin'
import { EventEmitter } from 'events'

export const EmitterMixin = Mixin((superclass) => class extends superclass {
  constructor(...args) {
    // mixins should either 1) not define a constructor, 2) require a specific
    // constructor signature, or 3) pass along all arguments.
    super(...args)
    this.Events = new EventEmitter()
  }
})

export default EmitterMixin