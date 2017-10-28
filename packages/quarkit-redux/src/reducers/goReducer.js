import Registry from '../utils/ReduxRegistryMixin'
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
