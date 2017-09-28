import { getReference } from '../utils'
/*
 * action types
 */

export const UPDATE_PRODUCTION = 'UPDATE_PRODUCTION'
export const UPDATE_PRODUCTION_TIME = 'UPDATE_PRODUCTION_TIME'
export const UPDATE_NEXT_PRODUCTION_TIME = 'UPDATE_NEXT_PRODUCTION_TIME'

/*
 * action creators
 */

export function updateProduction(production, resource, newValue) {
  return {
    type: UPDATE_PRODUCTION,
    resource: getReference(resource),
    production: getReference(production),
    newAmount: newValue,
  }
}


export function updateProductionTime(production, newTime) {
  return {
    type: UPDATE_PRODUCTION_TIME,
    production: getReference(production),
    newTime,
  }
}

export function updateNextProductionTime(production, nextTime) {
  return {
    type: UPDATE_NEXT_PRODUCTION_TIME,
    production: getReference(production),
    nextTime,
  }
}
