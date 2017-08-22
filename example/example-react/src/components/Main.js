import React from 'react'

import Header from './Header/Header'
import './Main.css'

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 82 && e.ctrlKey && e.shiftKey) {
    localStorage.clear()
  }
})

const Main = ({ state, actions }) => (
  <div className="Game">
    <Header {...{ state, actions }}/>
    <div className="Game-intro">

    </div>
  </div>
)

export default Main