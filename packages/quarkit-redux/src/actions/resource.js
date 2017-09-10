import { getReference } from '../utils'
import { stateFromGameObject } from '../state'
import { getResourceSlot } from '../selectors'
import Registry from '../utils/registry'
/*
 * action types
 */

export const ADD_RESOURCE = 'ADD_RESOURCE'
export const INCRASE_RESOURCE = 'INCRASE_RESOURCE'
export const UPDATE_RESOURCE_BAG = 'UPDATE_RESOURCE_BAG'

/*
 * action creators
 */

export function addResource(resourceBag, resource) {
  return { 
    type: ADD_RESOURCE,
    resourceBag: getReference(resourceBag),
    resource: getReference(resource),
  }
}

export function incraseResource(resourceBag, resource, newValue) {
  return { 
    type: INCRASE_RESOURCE,
    resource: getReference(resource),
    resourceBag: getReference(resourceBag),
    newAmount: newValue,
  }
}

// see http://redux.js.org/docs/advanced/AsyncActions.html
// see to add a middleware afin de gérer la gameLoop (boucle d'action du jeu)
// typiquement cette fonctionnalité est gérée par la boucle
export function updateResourceBagIfNeeded(resourceBag) {
  return function (dispatch) {

    if (!resourceBag.innerBag) {
      return
    }

    const goBag = Registry.getGO(resourceBag)
    const old = stateFromGameObject(goBag)

    goBag.loop()
   
    const _new = stateFromGameObject(goBag)
  
    _new.innerBag.map((slot)=>{
      const oldSlot = getResourceSlot(old,slot.resource)

      if(!oldSlot) 
        dispatch(addResource(resourceBag, slot.resource))
      else if(oldSlot.amount !== slot.amount)
        dispatch(incraseResource(resourceBag, slot.resource, slot.amount))
    })

  }  
}