import {getGOReference} from '../utils'

import { stateFromResourceMixin, stateFromResourceBagMixin } from './resource'
import { stateFromPossesorMixin, stateFromPurchasableMixin } from './purchasable'



export const stateFromGameObject = (go) => {
  let state = getGOReference(go)

  if(go.InnerBag) 
    state = stateFromResourceBagMixin(state, go)

  if(go.Possessions) 
    state = stateFromPossesorMixin(state, go)

  if(go.Premium) 
    state = stateFromResourceMixin(state, go)

  if(go.purchaseFor) 
    state = stateFromPurchasableMixin(state, go)
  
  return state
}