import { Mixin, mix } from 'quarkit-mixin'
import { ProductionMixin } from 'quarkit-modules'
import { ReduxMixin } from '../ReduxMixin'
import { getGOReference } from '../../utils'
import { productionReducer } from '../../reducers'
import { UPDATE_PRODUCTION, UPDATE_PRODUCTION_TIME, UPDATE_NEXT_PRODUCTION_TIME, updateProduction, updateProductionTime, updateNextProductionTime } from '../../actions'

export const ProductionReduxMixin = Mixin((superclass) =>
  class extends mix(superclass).with(ReduxMixin, ProductionMixin) {

    constructor(...args) {
      super(...args)

      this.Events.on(
        'set:stateprovider',
        () => {
          if (this.canDispatch()) {
            this.dispatch(
              updateNextProductionTime(getGOReference(this),
                this.LastProductionTime + this.ProductionBaseTime)
            )
          }
          // tricks for update vars
          this.defaultState()
        },
      )
      this.Events.on(
        'productionSlot:expressionProperty:update', (resource, oldValue, newValue) => {
          if (this.canDispatch()) {
            this.dispatch(
              updateProduction(getGOReference(this), getGOReference(resource), newValue)
            )
          }
        },
      )

      this.Events.on(
        'expressionProperty:update', (key, oldValue, newValue) => {
          if (key === 'ProductionBaseTime' && this.canDispatch()) {
            this.dispatch(
              updateProductionTime(getGOReference(this), newValue)
            )
          }
        },
      )

      this.Events.on(
        'production', (prodIterations, lastProd, nextProd) => {
          if (this.canDispatch()) {
            this.dispatch(
              updateNextProductionTime(getGOReference(this), nextProd)
            )
          }
        },
      )
    }

    // need clean implementation
    supportsReduce() {
      const supports = super.supportsReduce()
      // provide an array :
      // first element: an array of actions
      // second: a function takes (state, action) as parameter & can
      // return a bool or an object (see bellow)
      // support reduce if action is one of defined && the 2nd element function
      // return true of the correct object
      supports.push([
        // perform an || on all actions
        [UPDATE_PRODUCTION, UPDATE_NEXT_PRODUCTION_TIME, UPDATE_PRODUCTION_TIME],
        // can return an object, in this case the condition is
        // object.slug === state.slug && object.typeName === state.typeName
        (state, action) => action.production,
      ])
      return supports
    }

    defaultState(state = {}) {
      // take care of usage vvvv in mixin context ;)
      return Object.assign(super.defaultState(state), {
        productions: this.ProductionSlots.map((prodSlot) => ({
          resource: getGOReference(prodSlot.Resource),
          amount: prodSlot.Amount,
        })),
        productionTime: this.ProductionBaseTime,
      })
    }

    reduce(state = this.defaultState(), action) {
    // return possesorReducer with usage of parent reducer
      return productionReducer(super.reduce(state, action), action)
    }

})
