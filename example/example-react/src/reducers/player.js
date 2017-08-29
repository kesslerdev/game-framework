/*import { posessorReducer } from './purchasable'
import { resourceBagReducer } from 'quarkit-redux'*/
import { goReducer } from 'quarkit-redux'

const player = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, { ...action.player })
    case 'LOGOUT':
    case 'LOGIN_ERROR':
    case 'RM_USER':
      return {}
    default:
      return goReducer(state, action)//resourceBagReducer(posessorReducer(state, action), action)
  }
}

export default player