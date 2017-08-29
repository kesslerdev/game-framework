import { combineReducers } from 'redux'
import { goArrayReducer as go } from 'quarkit-redux'
import player from './player'



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