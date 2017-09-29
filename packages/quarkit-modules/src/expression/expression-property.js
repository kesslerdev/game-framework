import { Mixin } from 'quarkit-mixin'
import { Variable } from '../expression'

export const ExpressionPropertyMixin = Mixin((superclass) => class extends superclass {

  // value can be a variable ;)
  createProperty(name, value) {
    if (value instanceof Variable) {
      const varName = `_${name}_variable`
      this[varName] = value
      Object.defineProperty(this, 'Amount', {
        get: () => this[varName].Value,
        // do not use now if not reload event
        set: (val) => { this[varName].Value = val },
        enumerable: true,
        configurable: true,
      })
    } else {
      const valueName = `_${name}_value`
      this[valueName] = value
      Object.defineProperty(this, 'Amount', {
        get: () => this[valueName],
        // do not use now if not reload event
        set: (val) => { this[valueName] = val },
        enumerable: true,
        configurable: true,
      })
    }
  }
})
