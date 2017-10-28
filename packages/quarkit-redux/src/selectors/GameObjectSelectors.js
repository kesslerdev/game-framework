import { createSelector } from 'reselect'

const getRef = (state, ref) => ref

export const createGetGameObject = (getGameObjects) => createSelector(
    [getGameObjects, getRef],
    (gameObjects, ref) => gameObjects.find(
      (go) => go.slug === ref.slug && go.typeName === ref.typeName
    )
  )

export const createGetPurchasables = (getGameObjects) => createSelector(
    [getGameObjects],
    (gameObjects) => gameObjects.filter((go) => go.purchasable)
  )

export const createGameObjectSelectors = (getGameObjects) => (
  {
    getGameObjects,
    getGameObject: createGetGameObject(getGameObjects),
    getPurchasables: createGetPurchasables(getGameObjects),
  }
)
