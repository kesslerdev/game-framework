import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'
import { variableCreator, ExpressionVariable } from './variable'


export const ExpressionContainerMixin = Mixin((superclass) =>
  class extends mix(superclass).with(GameObjectMixin) {
    constructor(...args) {
      // mixins should either 1) not define a constructor, 2) require a specific
      // constructor signature, or 3) pass along all arguments.

      super(...args)

      this.__context = {
        this: this,
      }

      this.Events.on('context:provide', (key, value) => {
        this.setContext(key, value)
        if (value instanceof Object) {
          this.setContext(value.constructor.name, value)
        }
      })

      // works well with stateprovider
      this.Events.on('set:stateprovider', (stateProvider) => {
        this.Events.emit('context:provide', 'stateProvider', stateProvider)
      })
    }

    // use a new param to set name for set directly a property accessor for var.getValue()
    // dispatch an event if property value has changed
    createVariable(value) {
      const variable = variableCreator(value)
      if (variable instanceof ExpressionVariable) {
        variable.setContextAccessor(() => this.__context)
      }
      return variable
    }

    createProperty(key, value = null) {
      if (!this[key]) {
        Object.defineProperty(this, key, {
          get: () => this[`__${key}`].getValue(),
          set: (val) => { this[`__${key}`] = this.createVariable(val) },
          enumerable: true,
          configurable: true,
        })
      }

      if (value) { this[key] = value }
    }

    setContext(key, value) {
      this.__context[key] = value
    }

    get Context() {
      return this.__context
    }
  })
