

export const getGameObjectReference = (go) => {
  return {
    type: go.constructor.name,
    slug: go.slug
  }
}

export const stateFromGameObject = (go) => {
  return {
    reference: getGameObjectReference(go)
    // all other values such as innerbag or other based on mixin of gameobject
  }
}