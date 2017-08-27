import { getGameObjectReference } from '../utils'

/*
 * action types
 */

export const ADD_RESOURCE = 'ADD_RESOURCE'
export const INCRASE_RESOURCE = 'INCRASE_RESOURCE'


/*
 * action creators
 */

export function addResourceGO(resource) {
  return { 
    type: ADD_RESOURCE,
    resource: getGameObjectReference(resource)
  }
}

export function addResource(resource) {
  return { 
    type: ADD_RESOURCE,
    resource
  }
}

export function incraseResourceGO(resource, newValue) {
  return { 
    type: INCRASE_RESOURCE,
    resource: getGameObjectReference(resource),
    newAmount: newValue
  }
}

export function incraseResource(resource, newValue) {
  return { 
    type: INCRASE_RESOURCE,
    resource,
    newAmount: newValue
  }
}