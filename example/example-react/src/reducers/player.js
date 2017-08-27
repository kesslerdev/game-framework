import { posessorReducer } from './purchasable'
import { resourceBagReducer } from 'quarkit-redux'

const player = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, { ...action.player },{ go: action.playerGO })
    case 'LOGOUT':
    case 'LOGIN_ERROR':
    case 'RM_USER':
      return {}
    default:
      return resourceBagReducer(posessorReducer(state, action), action)
  }
}

export default player