import { Mixin, mix } from 'quarkit-mixin'
import { EventEmitter } from 'events'
export const GameObjectMixin = Mixin((superclass) => class extends superclass {

  constructor(...args) {
    // mixins should either 1) not define a constructor, 2) require a specific
    // constructor signature, or 3) pass along all arguments.

    super(...args)
    this.slug = args[0]
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

  static createGameObject(...args) {
    return new this(...args)
  }

  loop() {
    this.getRelated().map(goRelated => {
      if(goRelated instanceof GameObjectMixin) {
        goRelated.loopRelated(this)
      }
    })
  }

  loopRelated(go) {

  }

  getRelated() {
    return []
  }



})

export class GameObject extends mix().with(GameObjectMixin) {}
