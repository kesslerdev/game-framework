import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

import "material-design-icons/iconfont/material-icons.css"

import './index.css'
import App from './components'
import {store} from './store'

const Index = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)
ReactDOM.render(<Index/>, document.getElementById('root'));

registerServiceWorker();

export default Index