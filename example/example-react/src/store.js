import { createStore } from 'redux'
import rootReducer from './reducers'

export const store = createStore(rootReducer)

let unsubscribe = store.subscribe(() =>
  console.log("STATE:", store.getState())
)