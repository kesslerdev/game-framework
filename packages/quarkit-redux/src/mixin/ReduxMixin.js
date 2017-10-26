import { Mixin, mix } from 'quarkit-mixin'
import { getGOReference } from '../utils'
import { RegistrableMixin } from './RegistrableMixin'

export const ReduxMixin = Mixin((superclass) =>
  class extends mix(superclass).with(RegistrableMixin) {

    supportsReduce() {
      return []
    }

    canReduce(state, action) {
      let support = false
      this.supportsReduce().every(
        (el) => {
          // if action is one of supported
          if (el[0].find((act) => act === action.type)) {
            let supported = el[1](state, action)
            // object condition
            if (typeof supported === 'object') {
              supported = supported.slug === state.slug && supported.typeName === state.typeName
            }

            if (supported === true) {
              support = true
              return false // break the loop
            }
          }
          return true // continue the loop
        }
      )
      return support
    }

    defaultState(state = {}) {
      return Object.assign(state, getGOReference(this))
    }

    reduce(state = this.defaultState(), action) {
      return state
    }

    setDispatch(dispatch) {
      this.__dispatch = dispatch
    }

    canDispatch() {
      return this.__dispatch !== undefined
    }
    dispatch(action) {
      if (this.__dispatch) {
        this.__dispatch(action)
      } else {
        console.warn(`no dispatcher for GameObject ${this.toString()}`)
      }
    }

})
