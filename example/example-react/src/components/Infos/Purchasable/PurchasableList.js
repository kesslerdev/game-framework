import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {gameObjectSelectors} from '../../../selectors'
import Purchasable from './Purchasable'

const PurchasableList = ({ market, player }) => (
  <div>
    {market.map((v, i) =>
      <Purchasable key={i.toString()} purchasable={v} possesor={player}/>
    )}
  </div>
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