import { ResourceBagMixin } from 'quarkit-modules'

export const getGameObjectReference = (go) => {
  return {
    typeName: go.constructor.name,
    slug: go.slug
  }
}

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

export const stateFromGameObject = (go) => {
  let state = getGameObjectReference(go)

  if(go.innerBag) 
    state = stateFromResourceBagMixin(state, go)

  if(go.possessions) 
    state = stateFromPossesorMixin(state, go)

  if(go.premium) 
    state = stateFromResourceMixin(state, go)
  
  return state
}