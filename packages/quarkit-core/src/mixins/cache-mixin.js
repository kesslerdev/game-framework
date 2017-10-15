import { Mixin } from 'quarkit-mixin'

export const CacheMixin = Mixin((superclass) => class extends superclass {
  get Cache() {
    return this._cache || (this._cache = {})
  }

  clearCache() {
    this._cache = {}
  }
})

export default CacheMixin