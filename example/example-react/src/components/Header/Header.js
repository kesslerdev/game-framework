import React from 'react'
import PropTypes from 'prop-types'
// import the game for create instances & 
import {createPlayer} from '../../game'

import Login from '../Login/Login'
import GameInfo from '../Infos/GameInfo/GameInfo'

import logo from './logo.svg'
import './Header.css'

const Header = ({ onClick, connected, player }) => (
  <div className="Header">
    <img src={logo} className="Header-logo" alt="logo" />
    {connected ? 
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
  const connected = state.player.slug ? true : false
  const onClick = () => {
    actions.initGame(createPlayer('kesslerdev'))
  }

  return (<Header {...{ player, connected, onClick }} />)
}

export default Test