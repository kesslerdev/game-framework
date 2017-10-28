import { Mixin } from 'quarkit-mixin'

export const PropertyMixin = Mixin((superclass) => class extends superclass {
  createProperty(name, value) {
    if (!this[key]) {
      Object.defineProperty(this, key, {
        get: () => this[`_${key}`],
        // do not use now if not reload event
        set: (val) => { this[`_${key}`] = val },
        enumerable: true,
        configurable: true,
        writable: true
      })
      
      if (value) { this[`_${key}`] = value }
    }
  }

})

export default PropertyMixin