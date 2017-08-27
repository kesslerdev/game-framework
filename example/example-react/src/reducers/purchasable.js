import { getGameObjectReference } from 'quarkit-redux'
import {PURCHASE_FOR} from '../actions/purchasable'

export const defaultState = {
  possessions : []
}

export const posessorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PURCHASE_FOR:
      if(action.possessor.slug === state.slug && action.possessor.typeName === state.typeName)
        return Object.assign({}, state, {
          possessions: [
            ...state.possessions,
            {
              possession: getGameObjectReference(action.purchasable.go),
              state: action.purchasable.go.withState ? action.purchasable.go.__state : false
            }
          ]
        })
      
        return state
    default: 
      return state
  }
}