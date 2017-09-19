import React from 'react'
import "@material/list/dist/mdc.list.css"
import { connect } from 'react-redux'
import { purchaseFor } from 'quarkit-redux/actions'
import Purchase from './Purchase'
import './Purchasable.css'


const Purchasable = ({ purchasable, possesor, onPurchaseClick}) => {

  const isPurchased = () => {
    return possesor.possessions.find(
      go => go.possession.slug === purchasable.slug && go.possession.typeName === purchasable.typeName) !== undefined
  }
  
  return (
    <li className="mdc-list-item mdc-ripple-upgraded">
    <span className="mdc-list-item__start-detail grey-bg" role="presentation">
              <i className="material-icons" aria-hidden="true">store</i>
            </span>
    <span className="mdc-list-item__text">
    Building : {purchasable.slug}
              <span className="mdc-list-item__text__secondary">---</span>
    </span>
    {isPurchased() ? <i className="material-icons mdc-list-item__end-detail" style={{color:'green'}} aria-hidden="true">check</i> :
        <Purchase onPurchaseClick={()=>onPurchaseClick(purchasable, possesor)} />}
  </li>
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