import React from 'react'
import PropTypes from 'prop-types'

import ResourceBag from '../Resource/ResourceBag'

const GameInfo = ({ player }) => (
  <div>
    <h2>Welcome to the game {this.props.player.slug}</h2>
    <ResourceBag player={this.props.player} bag={this.props.player.innerBag}/>
  </div>
)

GameInfo.propTypes = {
  player: PropTypes.object.isRequired
}

export default GameInfo