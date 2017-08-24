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

export const stateFromResourceMixin = (state, go) => {
  return Object.assign({}, state, {
    premium: go.Premium
  })
}

export const stateFromGameObject = (go) => {
  let state = getGameObjectReference(go)

  if(go.innerBag) 
    state = stateFromResourceBagMixin(state, go)

  if(go.Premium) 
    state = stateFromResourceMixin(state, go)
  
  return state
}