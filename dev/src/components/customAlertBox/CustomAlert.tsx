import React from 'react'
import PizzaIcon from './PizzaIcon'

export default () => (
  <div style={{ position: 'relative' }}>
    <h2>This is our custom message to all readers</h2>
    <p style={{ marginBottom: '0' }}>
      Unfortunately someone broke the pizza machine and until they own up to their crimes we are not
      fixing the ice cream machine.
    </p>
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}
    >
      <PizzaIcon />
    </div>
  </div>
)
