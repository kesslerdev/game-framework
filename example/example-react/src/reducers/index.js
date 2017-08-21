import { combineReducers } from 'redux'

import player from './player'



const appReducer = combineReducers({
  player,
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR') {
    state = undefined // eslint-disable-line
  }
  return appReducer(state, action)
}

export default rootReducer