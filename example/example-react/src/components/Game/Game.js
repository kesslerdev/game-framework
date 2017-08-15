import React, { Component } from 'react'
import logo from './logo.svg'
import './Game.css'
import ResourceBag from '../Infos/Resource/ResourceBag'
import PurchasableList from '../Infos/Purchasable/PurchasableList'

class Game extends Component {

  render() {
    return (
      <div className="Game">
        <div className="Game-header">
          <img src={logo} className="Game-logo" alt="logo" />
          <h2>Welcome to the game {this.props.player.slug}</h2>
          <ResourceBag player={this.props.player} bag={this.props.player.innerBag}/>
        </div>
        <div className="Game-intro">
          <PurchasableList market={this.props.purchasable} possesor={this.props.player} />
        </div>
      </div>
    );
  }
}

export default Game;
