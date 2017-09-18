import { goReducer } from './go'
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../actions'

export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, { ...action.player })
    case LOGOUT:
    case LOGIN_ERROR:
      return {}
    default:
      return goReducer(state, action)
  }
}