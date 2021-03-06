import React from 'react'

import Header from './Header/Header'
import PurchasableList from './Infos/Purchasable/PurchasableList'

import "@material/snackbar/dist/mdc.snackbar.css"
import './Main.css'

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 82 && e.ctrlKey && e.shiftKey) {
    localStorage.clear()
  }
})

class Main extends React.Component {

    render = () => (
      <div className="Game">
        <Header state={this.props.state} actions={this.props.actions}/>
        <div className="Game-intro">
          {this.props.state.player.slug ?
            <PurchasableList state={this.props.state} actions={this.props.actions}/>
            : <div style={ {bottom: 'auto'} } className="mdc-snackbar mdc-snackbar--active">
                <div className="mdc-snackbar__text">Please Login</div>
              </div>
          }
        </div>
      </div>
    )
  }
export default Main
