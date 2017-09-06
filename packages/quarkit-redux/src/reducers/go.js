import { REGISTER_GAME_OBJECT, LOAD_ALL_GAME_OBJECT } from '../actions/quarkit'
import { resourceBagReducer } from './resource'
import { posessorReducer } from './purchasable'

export const goReducer = (state = [], action) => {
  //if is resourcebag
  state = resourceBagReducer(state, action)
  //if is possesor
  state = posessorReducer(state, action)

  return state
}


export const goArrayReducer = (state = [], action) => {
  switch (action.type) {
    case REGISTER_GAME_OBJECT:
      return [
        ...state,
        { ...action.go }
      ]
    case LOAD_ALL_GAME_OBJECT:
      return [
        ...state,
        ...action.go,
      ]
    default:
      return state.map((el) => goReducer(el, action))
  }
}