import { REGISTER_GAME_OBJECT, LOAD_ALL_GAME_OBJECT } from '../actions/quarkit'
import Registry from '../utils/registry'
import { ReduxMixin } from '../mixin'

export const goReducer = (state = [], action) => {
  if (Registry.hasGO(state)) {
    const go = Registry.getGO(state)
    if (go instanceof ReduxMixin && go.canReduce(state, action)) {
      return go.reduce(state, action)
    }
  }

  return state
}

export const goArrayReducer = (state = [], action) => {
  switch (action.type) {
    case REGISTER_GAME_OBJECT:
      return [
        ...state,
        { ...action.go },
      ]
    case LOAD_ALL_GAME_OBJECT:
      return [
        ...state,
        ...action.go,
      ]
    default:
      return state.map((el) => goReducer(el, action))
  }
}
