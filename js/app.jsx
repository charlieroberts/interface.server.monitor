import React from 'react'
import ReactDOM from 'react-dom'

import Communication  from './communication.js' 
import GUIClass from './gui.jsx'
import Monitor from './monitor.js'

let GUI = ReactDOM.render(
  <GUIClass />, 
  document.querySelector( '#ISMonitor' )
)

Monitor.init( GUI, Communication )

export default Monitor

