import React from 'react'
import "@material/button/dist/mdc.button.css"

const Purchase = ({ onPurchaseClick }) => (
  <button className="mdc-button mdc-list-item__end-detail material-icons" onClick={onPurchaseClick}>
    Buy
  </button>
)
  
export default Purchase