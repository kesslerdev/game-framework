import React from 'react'
import { connect } from 'react-redux'
import { purchaseFor } from 'quarkit-redux/actions'
import { Registry } from 'quarkit-redux'

import "@material/button/dist/mdc.button.css"

const Purchase = ({ possessor, purchasable, onPurchaseClick }) => {

  const canPurchase = () => {
    return Registry.getGO(purchasable).canPurchaseFor(Registry.getGO(possessor))
  }
  return (
    <button style={{width:'auto'}} disabled={!canPurchase()} className="mdc-button mdc-list-item__end-detail" onClick={()=>onPurchaseClick(purchasable, possessor)}>
      Buy {purchasable.cost.map((cost) => `${cost.amount} ${cost.resource.slug}`) }
    </button>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseClick: (purchasable, possessor) => {
      dispatch(purchaseFor(purchasable, possessor))
    }
  }
}
const DataPurchase = connect(
  null,
  mapDispatchToProps
)(Purchase)
 //
export default DataPurchase
