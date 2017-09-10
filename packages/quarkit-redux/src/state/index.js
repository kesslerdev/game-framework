import {getGOReference} from '../utils'
import {GameObjectMixin} from 'quarkit-core'
import {
  ResourceBagMixin, 
  PossessorMixin, PurchasableMixin, 
  ResourceMixin
} from 'quarkit-modules'

import { stateFromResourceMixin, stateFromResourceBagMixin } from './resource'
import { stateFromPossesorMixin, stateFromPurchasableMixin } from './purchasable'



export const stateFromGameObject = (go) => {
  let state = go instanceof GameObjectMixin ? getGOReference(go) : {}

  if(go instanceof ResourceBagMixin) 
    state = stateFromResourceBagMixin(state, go)

  if(go instanceof PossessorMixin) 
    state = stateFromPossesorMixin(state, go)

  if(go instanceof ResourceMixin) 
    state = stateFromResourceMixin(state, go)

  if(go instanceof PurchasableMixin) 
    state = stateFromPurchasableMixin(state, go)
  
  return state
}