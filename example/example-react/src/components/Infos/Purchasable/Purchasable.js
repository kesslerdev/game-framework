import React from 'react'
import { connect } from 'react-redux'
import { purchaseFor } from 'quarkit-redux/actions'
import Purchase from './Purchase'
import './Purchasable.css'


const Purchasable = ({ purchasable, possesor, onPurchaseClick}) => {

  const isPurchased = () => {
    return possesor.possessions.find(
      go => go.possession.slug === purchasable.slug && go.possession.typeName === purchasable.typeName) !== undefined
  }

  //const isPossesed = this.state.mine
  const className = 'Purchasable ' + (isPurchased() ? 'Purchasable-mine' :'')
  return (
    <div className={className}>
      Building : {purchasable.slug}
      {isPurchased() ? '' :
        <Purchase onPurchaseClick={()=>onPurchaseClick(purchasable, possesor)} />}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseClick: (purchasable, possesor) => {
      dispatch(purchaseFor(purchasable, possesor))
    }
  }
}
const DataPurchasable = connect(
  null,
  mapDispatchToProps
)(Purchasable)
 //
export default DataPurchasable