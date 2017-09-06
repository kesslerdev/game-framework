import {getGOReference} from '../utils'

export const stateFromResourceBagMixin = (state, go) => {
  return {
    ...state,
    innerBag: go.innerBag.map((rez) => {
      return {
        resource: getGOReference(rez.Resource),
        amount: rez.Amount
      }
    })
  }
}

export const stateFromResourceMixin = (state, go) => {
  return Object.assign({}, state, {
    premium: go.premium
  })
}