import { getReference } from '../utils'

/*
 * action types
 */

export const ADD_RESOURCE = 'ADD_RESOURCE'
export const SET_RESOURCE_AMOUNT = 'SET_RESOURCE_AMOUNT'
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

export function setResourceAmount(resourceBag, resource, newValue) {
  return { 
    type: SET_RESOURCE_AMOUNT,
    resource: getReference(resource),
    resourceBag: getReference(resourceBag),
    newAmount: newValue,
  }
}