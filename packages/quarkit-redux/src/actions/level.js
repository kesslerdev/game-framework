import Registry from '../utils/registry'
import { getReference } from '../utils'

/*
 * action types
 */

export const LEVEL_UP = 'LEVEL_UP'
export const UPDATE_LEVEL_UP_COST = 'UPDATE_LEVEL_UP_COST'


/*
 * action creators
 */

export function levelUp(upgrade, possessor) {
  const level = Registry.getGO(upgrade).levelUpFor(Registry.getGO(possessor))

  return {
    type: LEVEL_UP,
    level,
    upgrade: getReference(upgrade),
    possessor: getReference(possessor),
  }
}

export function updateLevelUpCost(upgrade, resource, newValue) {
  return {
    type: UPDATE_LEVEL_UP_COST,
    resource: getReference(resource),
    upgrade: getReference(upgrade),
    newAmount: newValue,
  }
}
