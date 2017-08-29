import { stateFromGameObject, Registry } from 'quarkit-redux'
import { createPlayer } from '../game'
/*
 * action types
 */

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'


/*
 * action creators
 */

export function addPlayer(name) {
  const player = createPlayer(name)
  Registry.registerGO(player)
  //register to Registry
  return { 
    type: LOGIN_SUCCESS,
    player: stateFromGameObject(player),
  }
}