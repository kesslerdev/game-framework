import {getGOReference} from '../utils'

export const stateFromPossesorMixin = (state, go) => {
  return {
    ...state,
    possessions: go.PossessionsObjects.map((poss) => {
      return {
        possession: getGOReference(poss),
        state: poss.withState ? poss.__state : false
      }
    })
  }
}


export const stateFromPurchasableMixin = (state, go) => {
  return Object.assign({}, state, {
    purchasable: go.purchaseFor ? true : false
  })
}