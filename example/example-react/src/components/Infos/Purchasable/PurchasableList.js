import React from 'react'
import PropTypes from 'prop-types'

import { getPurchasables } from '../../../selectors'
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

const Test = ({ state, actions }) => {
  const player = state.player
  const market = getPurchasables(state)

  return (<PurchasableList {...{ player, market }} />)
}

export default Test