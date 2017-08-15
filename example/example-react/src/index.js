import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Game } from './components'
import registerServiceWorker from './registerServiceWorker'
import {createPlayer, Shops} from './game/game'

const getPurchasable = _ => {
  return [
    Shops.AnciantFabric,
    Shops.LemonStand,
    Shops.NewsPaperDelivery
  ]
}

ReactDOM.render(<Game player={createPlayer(`kessler`)} purchasable={getPurchasable()}/>, document.getElementById('root'));
registerServiceWorker();
