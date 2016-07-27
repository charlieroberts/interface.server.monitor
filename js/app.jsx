import React from 'react'
import ReactDOM from 'react-dom'

import Communication  from './communication.js' 
import GUIClass from './gui.jsx'

let GUI = ReactDOM.render(
  <GUIClass />, 
  document.querySelector( '#ISMonitor' )
)

let Monitor = {
  GUI,
  Communication,

  init() {
    this.Communication.init()
    this.GUI.clientsTable.eventEmitter.on( 'beginClientMonitoring', client => Communication.beginMonitoringClient( client ) )
    this.GUI.clientsTable.eventEmitter.on( 'endClientMonitoring',   client => Communication.endMonitoringClient( client ) )
    this.Communication.on( 'monitoring', msgData => {
      let msg = JSON.parse( msgData )
      msg.data.value = msg.data.parameters.length > 1 ?  msg.data.parameters.toString() : msg.data.parameters[0]
      Monitor.GUI.signalsTable.addMessage( msg.data )
    })
    this.registerEvents()
  },

  registerEvents() {
    Communication.on( 'newClient', e => {
      let event = JSON.parse( e )
      GUI.clientsTable.addClient( event )
    })
  },
}

Monitor.init()

export default Monitor
