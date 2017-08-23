import React from 'react'

import Header from './Header/Header'
import { Resources, Shops } from '../game'
import './Main.css'

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 82 && e.ctrlKey && e.shiftKey) {
    localStorage.clear()
  }
})

class Main extends React.Component {
  
    componentDidMount = () => {
      this.props.actions.registerGameObject(Resources.Cash)
      this.props.actions.registerGameObject(Resources.Gold)
      this.props.actions.registerGameObject(Shops.AnciantFabric)
      this.props.actions.registerGameObject(Shops.LemonStand)
      this.props.actions.registerGameObject(Shops.NewsPaperDelivery)
    }
  
    render = () => (
      <div className="Game">
        <Header state={this.props.state} actions={this.props.actions}/>
        <div className="Game-intro">

        </div>
      </div>
    )
  }
export default Main