import Registry from '../utils/ReduxRegistryMixin'

/*
 * action types
 */

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'


/*
 * action creators
 */

export function addPlayer(player) {
  Registry.registerGO(player)

  return {
    type: LOGIN_SUCCESS,
    player: player.defaultState({}),
  }
}
