import Registry from '../utils/ReduxRegistryMixin'
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
  // ugly trigger updateLevelUpCost(in case of realy changed by call expression parsing event)
  Registry.getGO(upgrade).UpgradeCost.forEach((el) => {
    const x = el.Amount
  })

  // ugly trigger updateLevelUpCost(in case of realy changed by call expression parsing event)
  Registry.getGO(upgrade).ProductionSlots.forEach((el) => {
    const x = el.Amount
  })
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
