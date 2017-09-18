
import { getGOStringReference, getStateGOStringReference } from './reference'

// can have an extended registry can provide dispatcher to all new mixin with dispatcher
class Registry {
  get GO() {
    return this._objects || (this._objects = {})
  }

  registerGO(go) {
    this.GO[getGOStringReference(go)] = go
  }

  hasGO(reference) {
    if(reference.typeName && reference.slug)
      reference = getStateGOStringReference(reference)
    
    return this._objects[reference] ? true : false
  }
  getGO(reference) {
    if(reference.typeName && reference.slug)
      reference = getStateGOStringReference(reference)
    
    if(this._objects[reference])
      return this._objects[reference]
    
    throw new Error(`Unregistred GameObject "${reference}"`)
  }
}

const RegistryInst = new Registry()

export default RegistryInst