

export const getGameObjectReference = (go) => {
  return {
    type: go.constructor.name,
    slug: go.slug
  }
}