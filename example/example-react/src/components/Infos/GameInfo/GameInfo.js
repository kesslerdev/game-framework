import React from 'react'
import PropTypes from 'prop-types'

import ResourceBag from '../Resource/ResourceBag'

const GameInfo = ({ player }) => (
  <div>
    <h2>Welcome to the game {player.slug}</h2>
    <ResourceBag bag={player.innerBag} />
  </div>
)

GameInfo.propTypes = {
  player: PropTypes.object.isRequired
}
 //
export default GameInfo