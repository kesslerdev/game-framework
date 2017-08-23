import { combineReducers } from 'redux'

import player from './player'
import go from './game-object'



const appReducer = combineReducers({
  player,
  go,
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR') {
    state = undefined // eslint-disable-line
  }
  return appReducer(state, action)
}

export default rootReducer