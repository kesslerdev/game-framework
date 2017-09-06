import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware/*, // lets us dispatch() functions
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
  )
)

// eslint-disable-next-line
let unsubscribe = store.subscribe(() =>
  console.log("STATE:", store.getState())
)