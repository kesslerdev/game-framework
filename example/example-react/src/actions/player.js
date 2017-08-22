import { stateFromGameObject } from 'quarkit-redux'
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

  return { 
    type: LOGIN_SUCCESS,
    player: stateFromGameObject(player)
  }
}