import Registry from '../utils/registry'
import objectToArray from '../utils/objectToArray'
import { ReduxMixin } from '../mixin/redux'

import { addPlayer } from './player'

/*
 * action types
 */
export const REGISTER_GAME_OBJECT = 'REGISTER_GAME_OBJECT'
export const LOAD_ALL_GAME_OBJECT = 'LOAD_ALL_GAME_OBJECT'
export const INIT_GAME = 'INIT_GAME'


/*
 * action creators
 */

export function registerGameObject(go) {
  return { 
    type: REGISTER_GAME_OBJECT,
    go: go.defaultState({})
  }
}

export function loadAllGameObjects() {
  return { 
    type: LOAD_ALL_GAME_OBJECT,
    go: objectToArray(Registry.GO).map((go) => go.defaultState({}))
  }
}

export function initGame(player) {
  return function (dispatch) {
    console.info('Starting Quarkit..')
    
    objectToArray(Registry.GO).map((go) => {
      if(go instanceof ReduxMixin)
        go.dispatch = dispatch
    })

    dispatch(loadAllGameObjects())
    dispatch(addPlayer(player))
    console.info('OK')
    
    console.info('loop init ticks 300 ms')

    setInterval(()=>{
      console.info('tick')
      player.loop()
    }, 300)
  }  
}