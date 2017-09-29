import { Mixin, mix } from 'quarkit-mixin'
import { GameRegistryMixin } from 'quarkit-core'
import objectToArray from '../utils/objectToArray'
import { ReduxMixin } from '../mixin/redux'
import { getStateGOStringReference } from './reference'

export const ReduxRegistryMixin = Mixin((superclass) =>
  class extends mix(superclass).with(GameRegistryMixin) {

    hasGO(reference) {
      const ref = reference.typeName && reference.slug ?
      getStateGOStringReference(reference) : reference

      return super.hasGO(ref)
    }

    getGO(reference) {
      const ref = reference.typeName && reference.slug ?
      getStateGOStringReference(reference) : reference
      return super.getGO(ref)
    }

    set Dispatch(dispatch) {
      objectToArray(this.GO).forEach((go) => {
        if (go instanceof ReduxMixin) {
          go.setDispatch(dispatch)
        }
      })
    }
})

export class ReduxRegistry extends mix().with(ReduxRegistryMixin) {}


// can have an extended registry can provide dispatcher to all new mixin with dispatcher

const RegistryInst = new ReduxRegistry()

export default RegistryInst
