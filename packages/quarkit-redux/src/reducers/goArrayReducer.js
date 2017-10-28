import { REGISTER_GAME_OBJECT, LOAD_ALL_GAME_OBJECT } from '../actions/quarkit'
import { goReducer } from './goReducer'

export const goArrayReducer = (state = [], action) => {
  switch (action.type) {
    case REGISTER_GAME_OBJECT:
      return [
        ...state,
        { ...action.go },
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
