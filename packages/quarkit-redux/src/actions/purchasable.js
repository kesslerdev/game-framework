import Registry from '../utils/registry'
import { getReference } from '../utils'

/*
 * action types
 */

export const PURCHASE_FOR = 'PURCHASE_FOR'


/*
 * action creators
 */

export function purchaseFor(purchasable, possessor) {

  Registry.getGO(purchasable).purchaseFor(Registry.getGO(possessor))
  
  return { 
    type: PURCHASE_FOR,
    purchasable: getReference(purchasable),
    possessor: getReference(possessor),
  }
}