import { Mixin, mix } from 'quarkit-mixin'
import { ResourceBagMixin } from 'quarkit-modules'
import { ReduxMixin } from '../redux'
import { setResourceAmount } from '../../actions'
import { getGOReference } from '../../utils'
import { resourceBagReducer } from '../../reducers'
import { ADD_RESOURCE, SET_RESOURCE_AMOUNT } from '../../actions'

export const ResourceBagReduxMixin = Mixin((superclass) => class extends mix(superclass).with(ReduxMixin, ResourceBagMixin) {

  supportsReduce(state, action) {
    return (
      (action.type === ADD_RESOURCE || action.type === SET_RESOURCE_AMOUNT) && 
        action.resourceBag.slug === state.slug && action.resourceBag.typeName === state.typeName
      )
    // if parent support the reduce
    || super.supportsReduce(state, action)
  }

  defaultState(state = {}) {
    return Object.assign(state, super.defaultState(state), {
      innerBag: this.innerBag.map((rez) => {
        return {
          resource: getGOReference(rez.Resource),
          amount: rez.Amount
        }
      })
    })
  }

  reduce(state = this.defaultState(), action) {
     // return resourceBagReducer with usage of parent reducer
     return resourceBagReducer(super.reduce(state, action), action)
  }

  incraseResource(resource, amount) {
    const ret = super.incraseResource(resource, amount)
    if(this.dispatch) {
      this.dispatch(
        setResourceAmount(getGOReference(this), getGOReference(resource), ret)
      )      
    }

    return ret
  }

  decraseResource(resource, amount) {
    const ret = super.decraseResource(resource, amount)
    if(this.dispatch) {
      this.dispatch(
        setResourceAmount(getGOReference(this), getGOReference(resource), ret)
      )      
    }

    return ret
  }
})
