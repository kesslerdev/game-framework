import { stateFromGameObject } from '../utils'

/*
 * action types
 */

export const ADD_GAME_OBJECT = 'ADD_GAME_OBJECT'


/*
 * action creators
 */

export function addGameObject(go) {
  return {
    type: ADD_GAME_OBJECT,
    gameObject: stateFromGameObject(go)
  }
}