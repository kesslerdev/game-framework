import { combineReducers } from 'redux'
import { goArrayReducer, playerReducer, timeReducer } from 'quarkit-redux'



const appReducer = combineReducers({
  player: playerReducer,
  go: goArrayReducer,
  time: timeReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR') {
    state = undefined // eslint-disable-line
  }
  return appReducer(state, action)
}

export default rootReducer
