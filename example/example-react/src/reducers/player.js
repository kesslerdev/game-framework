const player = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...action.player }
    case 'LOGOUT':
    case 'LOGIN_ERROR':
    case 'RM_USER':
      return {}
    default:
      return state
  }
}

export default player