import { Mixin, mix } from 'quarkit-mixin'
import getGOReference from './utils/getGOStringReference'

export const GameRegistryMixin = Mixin((superclass) => class extends superclass {

  get GO() {
    return this._objects || (this._objects = {})
  }

  registerGO(go) {
    this.GO[getGOReference(go)] = go
  }

  hasGO(reference) {
    return this._objects[reference] !== undefined
  }

  getGO(reference) {
    if (this._objects[reference]) {
      return this._objects[reference]
    }

    throw new Error(`Unregistred GameObject "${reference}"`)
  }

})

export class GameRegistry extends mix().with(GameRegistryMixin) {}
