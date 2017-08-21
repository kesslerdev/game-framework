import { createStore } from 'redux'
import quarkit from './reducers'

export const store = createStore(rootReducer)

let unsubscribe = store.subscribe(() =>
  console.log("STATE:", store.getState())
)