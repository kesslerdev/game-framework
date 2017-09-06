import { stateFromGameObject } from '../state'
import Registry from '../utils/registry'
import objectToArray from '../utils/objectToArray'

/*
 * action types
 */

export const REGISTER_GAME_OBJECT = 'REGISTER_GAME_OBJECT'
export const LOAD_ALL_GAME_OBJECT = 'LOAD_ALL_GAME_OBJECT'


/*
 * action creators
 */

export function registerGameObject(go) {
  Registry.registerGO(go)

  return { 
    type: REGISTER_GAME_OBJECT,
    go: stateFromGameObject(go)
  }
}

export function loadAllGameObjects() {
  return { 
    type: LOAD_ALL_GAME_OBJECT,
    go: objectToArray(Registry.GO).map((go) => stateFromGameObject(go))
  }
}