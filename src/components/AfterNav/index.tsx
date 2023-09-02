import React, { useState } from 'react'

const AfterNav: React.FC = () => {
  const [counter, setCounter] = useState(0)

  return (
    <section>
      <p>Here is my custom component.</p>
      <p>Current count: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increase</button>
    </section>
  )
}

export default AfterNav
