import { ADD_RESOURCE, SET_RESOURCE_AMOUNT } from '../actions'

const defaultState = {
  innerBag: [],
}

export const resourceBagReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_RESOURCE:
      if (
        action.resourceBag.slug !== state.slug
        && action.resourceBag.typeName !== state.typeName
      ) {
        return state
      }

      return Object.assign({}, state, {
        innerBag: [
          ...state.innerBag,
          {
            resource: action.resource,
            amount: 0,
          },
        ],
      })
    case SET_RESOURCE_AMOUNT:
      if (
        action.resourceBag.slug !== state.slug
        && action.resourceBag.typeName !== state.typeName
      ) {
        return state
      }

      return Object.assign({}, state, {
        innerBag: state.innerBag.map((slot) => {
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
