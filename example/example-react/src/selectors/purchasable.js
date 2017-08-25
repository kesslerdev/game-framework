import { createSelector } from 'reselect'

const getGameObjects = (state) => state.go

export const getPurchasables = createSelector(
  [getGameObjects],
  (gameObjects) => gameObjects.filter(go => go.purchasable)
)