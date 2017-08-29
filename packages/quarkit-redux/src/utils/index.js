import { ResourceBagMixin } from 'quarkit-modules'
import objectToArray from './objectToArray'
import Registry from './registry'

export * from './reference'

export { objectToArray, Registry }

export const stateFromResourceBagMixin = (state, go) => {
  return {
    ...state,
    innerBag: go.innerBag.map((rez) => {
      return {
        resource: getGameObjectReference(rez.Resource),
        amount: rez.Amount
      }
    })
  }
}

export const stateFromPossesorMixin = (state, go) => {
  return {
    ...state,
    possessions: go.PossessionsObjects.map((poss) => {
      return {
        possession: getGameObjectReference(poss),
        state: poss.withState ? poss.__state : false
      }
    })
  }
}

export const stateFromResourceMixin = (state, go) => {
  return Object.assign({}, state, {
    premium: go.premium
  })
}

export const stateFromPurchasableMixin = (state, go) => {
  return Object.assign({}, state, {
    purchasable: go.purchaseFor ? true : false
  })
}

export const stateFromGameObject = (go) => {
  let state = getGameObjectReference(go)

  if(go.InnerBag) 
    state = stateFromResourceBagMixin(state, go)

  if(go.Possessions) 
    state = stateFromPossesorMixin(state, go)

  if(go.Premium) 
    state = stateFromResourceMixin(state, go)

  if(go.purchaseFor) 
    state = stateFromPurchasableMixin(state, go)
  
  return state
}