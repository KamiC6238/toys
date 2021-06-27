import React from 'react'

import { throttle } from '../../common'

export const Throttle = () => {
  const [count, setCount] = React.useState(0)

  const callback = React.useCallback(
    throttle(() => setCount(count => count + 1), 1000)
  , [])

  return (
    <>
      <button onClick={() => callback()}>add count</button>
      <div>{count}</div>
    </>
  )
}