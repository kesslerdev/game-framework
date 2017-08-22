import React from 'react'
import PropTypes from 'prop-types'

import Login from '../Login/Login'
import GameInfo from '../Infos/GameInfo/GameInfo'

import logo from './logo.svg'
import './Header.css'

const Header = ({ onClick, connected, player }) => (
  <div className="Header">
    <img src={logo} className="Header-logo" alt="logo" />
    {this.props.connected ? 
      <GameInfo player={player} />
    : <Login onClick={onClick} />
    }

  </div>
)

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired
}

const Test = ({ state, actions }) => {
  const player = state.player
  const connected = state.player.reference ? true : false
  const onClick = () => {
    actions.addPlayer('kesslerdev')
  }

  return (<Header {...{ player, connected, onClick }} />)
}

export default Test