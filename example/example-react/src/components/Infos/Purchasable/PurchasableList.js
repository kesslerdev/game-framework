import React from 'react'
import PropTypes from 'prop-types'
import "@material/list/dist/mdc.list.css"
import { connect } from 'react-redux'

import {gameObjectSelectors} from '../../../selectors'
import Purchasable from './Purchasable'


const PurchasableList = ({ market, player }) => (
  <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list two-line-avatar-text-icon-demo">
    {market.map((v, i) =>
      <Purchasable key={i.toString()} purchasable={v} possesor={player}/>
    )}
  </ul>
)

PurchasableList.propTypes = {
  market: PropTypes.array.isRequired
}

const mapStateToProps = (state, props) => {
  return {
    player: state.player,
    market: gameObjectSelectors.getPurchasables(state)
  }
}

const DataPurchasableList = connect(
  mapStateToProps
)(PurchasableList)
 //
export default DataPurchasableList