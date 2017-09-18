import { Mixin } from 'quarkit-mixin'
import Registry from '../utils/registry'

// create another mixin take dispatcher & set event handlers to can dispatch differents action for differents event of go
export const RegistrableMixin = Mixin((superclass) => class extends superclass {
 
  constructor(...args) {
    // mixins should either 1) not define a constructor, 2) require a specific
    // constructor signature, or 3) pass along all arguments.

    super(...args)
    
    Registry.registerGO(this)
  }

})