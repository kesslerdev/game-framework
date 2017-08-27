import { stateFromGameObject, addResource, incraseResource } from 'quarkit-redux'
import { store } from '../store'

import { getResourceSlot } from '../selectors'

/*
 * action types
 */

export const UPDATE_RESOURCE_BAG = 'UPDATE_RESOURCE_BAG'


/*
 * action creators
 */

export function updateResourceBagIfNeeded(resourceBag) {
  const old = stateFromGameObject(resourceBag.go)
  if(resourceBag.go.PossessionsObjects)
    resourceBag.go.PossessionsObjects.map(go =>{
      if(go.applyProduction)
        go.applyProduction(resourceBag.go)
    })

    
  const _new = stateFromGameObject(resourceBag.go)

  _new.innerBag.map((slot)=>{
    const oldSlot = getResourceSlot(old,slot.resource)
    if(!oldSlot) 
      store.dispatch(addResource(slot.resource))
    else if(oldSlot.amount !== slot.amount)
      store.dispatch(incraseResource(slot.resource, slot.amount))
  })
  
}