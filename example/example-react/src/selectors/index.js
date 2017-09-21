import { createGameObjectSelectors } from 'quarkit-redux'

const getGameObjects = (state) => state.go

export const gameObjectSelectors = createGameObjectSelectors(getGameObjects)

export default gameObjectSelectors