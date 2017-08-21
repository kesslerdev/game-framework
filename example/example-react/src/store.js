import { createStore } from 'redux'
import quarkit from './reducers'

export const store = createStore(quarkit)

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)