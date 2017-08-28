
export const getGOReference = (go) => {
  return {
    typeName: go.constructor.name,
    slug: go.slug
  }
}

export const getGOStringReference = (go) => {
  return `${go.constructor.name}#${go.slug}`
}

export const getStateGOStringReference = (stateGo) => {
  return `${stateGo.typeName}#${stateGo.slug}`
}

export default getGOReference