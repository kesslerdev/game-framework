import { createStore } from 'redux'
import rootReducer from './reducers'

export const store = createStore(rootReducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

let unsubscribe = store.subscribe(() =>
  console.log("STATE:", store.getState())
)