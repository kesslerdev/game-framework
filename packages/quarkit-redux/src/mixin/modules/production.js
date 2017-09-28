import { Mixin, mix } from 'quarkit-mixin'
import { ProductionMixin } from 'quarkit-modules'
import { ReduxMixin } from '../redux'
import { getGOReference } from '../../utils'
import { productionReducer } from '../../reducers'
import { UPDATE_PRODUCTION, UPDATE_PRODUCTION_TIME, UPDATE_NEXT_PRODUCTION_TIME, updateProduction, updateProductionTime, updateNextProductionTime } from '../../actions'

export const ProductionReduxMixin = Mixin((superclass) =>
  class extends mix(superclass).with(ReduxMixin, ProductionMixin) {

    constructor(...args) {
      super(...args)
      this.Events.on(
        'productionSlot:expressionProperty:update',
        (resource, oldValue, newValue) => {
          if (this.dispatch) {
            this.dispatch(
              updateProduction(getGOReference(this), getGOReference(resource), newValue)
            )
          }
        },
      )

      this.Events.on(
        'expressionProperty:update',
        (key, oldValue, newValue) => {
          if (this.dispatch && key === 'ProductionBaseTime') {
            this.dispatch(
              updateProductionTime(getGOReference(this), newValue)
            )
          }
        },
      )

      this.Events.on(
        'production',
        (prodIterations, lastProd, nextProd) => {
          if (this.dispatch) {
            this.dispatch(
              updateNextProductionTime(getGOReference(this), nextProd)
            )
          }
        },
      )
    }

    // need clean implementation
    supportsReduce(state, action) {
      return (
          action.type === UPDATE_PRODUCTION &&
          action.production.slug === state.slug &&
          action.production.typeName === state.typeName
        )
        || (
          action.type === UPDATE_NEXT_PRODUCTION_TIME &&
          action.production.slug === state.slug &&
          action.production.typeName === state.typeName
        )
        || (
          action.type === UPDATE_PRODUCTION_TIME &&
          action.production.slug === state.slug &&
          action.production.typeName === state.typeName
        )
         // if parent support the reduce
        || super.supportsReduce(state, action)
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
