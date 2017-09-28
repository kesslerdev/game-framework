import { UPDATE_PRODUCTION, UPDATE_PRODUCTION_TIME, UPDATE_NEXT_PRODUCTION_TIME } from '../actions/production'

const defaultState = {
  productions: [],
}

export const productionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_NEXT_PRODUCTION_TIME:
      if (action.production.slug !== state.slug && action.production.typeName !== state.typeName) {
        return state
      }
      return Object.assign({}, state, {
        nextProductionTime: action.nextTime,
      })
    case UPDATE_PRODUCTION_TIME:
      if (action.production.slug !== state.slug && action.production.typeName !== state.typeName) {
        return state
      }
      return Object.assign({}, state, {
        productionTime: action.newTime,
      })
    case UPDATE_PRODUCTION:
      if (action.production.slug !== state.slug && action.production.typeName !== state.typeName) {
        return state
      }

      return Object.assign({}, state, {
        productions: state.productions.map((slot) => {
          if (
            slot.resource.type === action.resource.type
            && slot.resource.slug === action.resource.slug
          ) {
            return Object.assign({}, slot, {
              amount: action.newAmount,
            })
          }
          return slot
        }),
      })
    default:
      return state
  }
}
