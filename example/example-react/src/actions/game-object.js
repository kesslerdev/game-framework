import { stateFromGameObject } from 'quarkit-redux'
/*
 * action types
 */

export const REGISTER_GAME_OBJECT = 'REGISTER_GAME_OBJECT'


/*
 * action creators
 */

export function registerGameObject(go) {
  return { 
    type: REGISTER_GAME_OBJECT,
    stateGO: stateFromGameObject(go),
    go
  }
}