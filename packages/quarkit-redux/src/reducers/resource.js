import { ADD_RESOURCE, INCRASE_RESOURCE } from '../actions'
export const defaultState = {
  innerBag : []
}

export const resourceBagReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_RESOURCE:
      return Object.assign({}, state, {
        innerBag: [
          ...state.innerBag,
          {
            resource: action.resource,
            amount: 0
          }
        ]
      })
    case INCRASE_RESOURCE:
      return Object.assign({}, state, {
        innerBag: state.innerBag.map((slot) => {
          if (
            slot.resource.type === action.resource.type
            && slot.resource.slug === action.resource.slug
          ) {
            return Object.assign({}, slot, {
              amount: action.newAmount
            })
          }
          return slot
        })
      })
    default:
      return state
  }
}