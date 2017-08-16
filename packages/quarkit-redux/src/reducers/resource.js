
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
            type: action.resource.type,
            slug: action.resource.slug,
            amount: 0
          }
        ]
      })
    case INCRASE_RESOURCE:
      return Object.assign({}, state, {
        innerBag: state.innerBag.map((resource) => {
          if (
            resource.type === action.resource.type
            && resource.slug === action.resource.slug
          ) {
            return Object.assign({}, resource, {
              amount: action.newAmount
            })
          }
          return resource
        })
      })
    default:
      return state
  }
}