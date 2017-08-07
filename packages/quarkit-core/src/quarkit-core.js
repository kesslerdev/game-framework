import { Mixin } from 'quarkit-mixin'
import { EventEmitter } from 'events'

export const GameObjectMixin = Mixin((superclass) => class extends superclass {

  constructor(...args) {
    // mixins should either 1) not define a constructor, 2) require a specific
    // constructor signature, or 3) pass along all arguments.
    console.log(args)

    super(...args)
    
    this.Events = new EventEmitter()
  }

  get Cache() {
    return this._cache || (this._cache = {})
  }

  equals(obj) {
    return obj.slug == this.slug && this.constructor.name == obj.constructor.name
  }

  clearCache() {
    this._cache = {}
  }

})