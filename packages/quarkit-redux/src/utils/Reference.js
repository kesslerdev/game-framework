
export const getGOReference = (go) => (
  {
    typeName: go.constructor.name,
    slug: go.slug,
  }
)

export const getReference = (goState) => (
  {
    typeName: goState.typeName,
    slug: goState.slug,
  }
)

export const getStateGOStringReference =
  (stateGo) => `${stateGo.typeName}#${stateGo.slug}`


export default getGOReference
