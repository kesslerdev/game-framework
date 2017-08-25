import { createSelector } from 'reselect'

const getGameObjects = (state) => state.go
const getRef = (state, ref) => ref

export const getGameObject = createSelector(
  [ getGameObjects , getRef],
  (gameObjects, ref) => gameObjects.find(go => go.slug === ref.slug && go.typeName === ref.typeName)
)