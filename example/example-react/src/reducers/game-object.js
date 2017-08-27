import { REGISTER_GAME_OBJECT } from '../actions/game-object'

const go = (state = [], action) => {
  switch (action.type) {
    case REGISTER_GAME_OBJECT:
      return [
        ...state,
        Object.assign({ ...action.stateGO }, { go: action.go })
      ]
    default:
      return state
  }
}

export default go