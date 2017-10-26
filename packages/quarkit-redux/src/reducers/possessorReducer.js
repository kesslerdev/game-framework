import { PURCHASE_FOR } from '../actions/purchasable'
import Registry from '../utils/ReduxRegistryMixin'

const defaultState = {
  possessions: [],
}

export const possessorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PURCHASE_FOR:
      if (action.possessor.slug !== state.slug && action.possessor.typeName !== state.typeName) {
        return state
      }

      return Object.assign({}, state, {
        possessions: [
          ...state.possessions,
          {
            possession: action.purchasable,
            state: Registry.getGO(action.purchasable).withState ?
              Registry.getGO(action.purchasable).__state : false,
          },
        ],
      })
    default:
      return state
  }
}
