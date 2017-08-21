import React, { Component } from 'react'
import logo from './logo.svg'
import './Game.css'

import Header from '../Header'

class Game extends Component {
  
  render() {
    return (
      <div className="Game">
        <Header connected={this.props.player? true: false} player={this.props.player}/>
        <div className="Game-intro">
          <PurchasableList market={this.props.purchasable} possesor={this.props.player} />
        </div>
      </div>
    );
  }
}

export default Game;
