import { REGISTER_GAME_OBJECT, LOAD_ALL_GAME_OBJECT } from '../actions/quarkit'

export const go = (state = [], action) => {
  return state
}


export const gos = (state = [], action) => {
  switch (action.type) {
    case REGISTER_GAME_OBJECT:
      return [
        ...state,
        ...action.go
      ]
    case LOAD_ALL_GAME_OBJECT:
      return [
        ...state,
        { ...action.go }
      ]
    default:
      return state.map((el) => go(el, action))
  }
}

export default gos