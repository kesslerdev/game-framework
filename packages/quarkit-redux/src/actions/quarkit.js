import { objectToArray, Registry, GameLoop } from '../utils'
import { addPlayer } from './player'
import { updateTime } from './time'

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
    go: go.defaultState({}),
  }
}

export function loadAllGameObjects() {
  return {
    type: LOAD_ALL_GAME_OBJECT,
    go: objectToArray(Registry.GO).map((go) => go.defaultState({})),
  }
}

export function initGame(player) {
  return function (dispatch) {
    console.info('Starting Quarkit..')
    console.info('Register Dispatcher with ReduxMixins')
    Registry.Dispatch = dispatch

    console.info('Load all GameObjects in Redux State')
    dispatch(loadAllGameObjects())
    console.info('Load player in Redux State')
    dispatch(addPlayer(player))
    console.info('OK')

    console.info('loop init ticks 300 ms')
    GameLoop.TicksTime = 250
    console.info('Register Player in GameLoop')
    GameLoop.registerGameObject(player)
    console.info('Register DateUpdate in GameLoop')
    GameLoop.registerFunctionCall(() => { dispatch(updateTime(Date.now())) })
    console.info('GameLoop Start')
    GameLoop.start()
  }
}
