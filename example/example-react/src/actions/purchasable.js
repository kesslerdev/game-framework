/*
 * action types
 */

export const PURCHASE_FOR = 'PURCHASE_FOR'


/*
 * action creators
 */

export function purchaseFor(purchasable, possessor) {

  purchasable.go.purchaseFor(possessor.go)
  
  return { 
    type: PURCHASE_FOR,
    purchasable: purchasable,
    possessor: possessor,
  }
}