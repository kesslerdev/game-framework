import { Mixin, mix } from 'quarkit-mixin'
import { GameObjectMixin } from 'quarkit-core'
import { variableCreator, ExpressionVariable, IVariable } from './variable'


export const ExpressionContainerMixin = Mixin((superclass) => class extends mix(superclass).with(GameObjectMixin) {

  constructor(...args) {
    // mixins should either 1) not define a constructor, 2) require a specific
    // constructor signature, or 3) pass along all arguments.

    super(...args)

    this.__context = {
      this: this
    }

    this.Events.on('context:provide', (key, value) => {
      this.setContext(key, value)
    })
    // works well with stateprovider
    this.Events.on('set:stateprovider', stateProvider => {
      this.Events.emit('context:provide','stateProvider', stateProvider)
    })
  }

  createVariable(value) {
      const variable = variableCreator(value)
      if (variable instanceof ExpressionVariable) {
          variable.setContextAccessor(() => {
              return this.__context
          })
      }
      return variable
  }

  setContext(key,value) {
      this.__context[key] = value
  }

  get Context() {
      return this.__context
  }
})