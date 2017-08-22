import { ResourceBagMixin } from 'quarkit-modules'

export const getGameObjectReference = (go) => {
  return {
    typeName: go.constructor.name,
    slug: go.slug
  }
}

export const stateFromResourceBagMixin = (go) => {
  return {
    game: false
  }
}
export const stateFromGameObject = (go) => {
  let state = getGameObjectReference(go)

  if(go instanceof ResourceBagMixin) 
    state.innerBag = stateFromResourceBagMixin(go)
  
  return state
}