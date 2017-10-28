import { LEVEL_UP, UPDATE_LEVEL_UP_COST } from '../actions/level'

const defaultState = {
  level: 0,
  levelUpCost: [],
}

export const levelReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LEVEL_UP:
      return Object.assign({}, state, {
        level: action.level,
      })
    case UPDATE_LEVEL_UP_COST:
      return Object.assign({}, state, {
        levelUpCost: state.levelUpCost.map((slot) => {
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
