import { getGameObjectReference } from '../utils'

/*
 * action types
 */

export const ADD_RESOURCE = 'ADD_RESOURCE'
export const INCRASE_RESOURCE = 'INCRASE_RESOURCE'


/*
 * action creators
 */

export function addResource(resource) {
  return { 
    type: ADD_RESOURCE,
    resource: getGameObjectReference(resource)
  }
}

export function incraseResource(resource, newValue) {
  return { 
    type: INCRASE_RESOURCE,
    resource: getGameObjectReference(resource),
    newAmount: newValue
  }
}