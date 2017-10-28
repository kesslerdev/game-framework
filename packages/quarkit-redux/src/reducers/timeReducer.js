import { TIME_UPDATE } from '../actions/time'

const defaultState = {
  current: Date.now(),
  tickTime: 500, // TODO: use the gameloop getter ;)
}

export const timeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TIME_UPDATE:
      return Object.assign({}, state, {
        current: action.currentTime,
      })
    default:
      return state
  }
}
