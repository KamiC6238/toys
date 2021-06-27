import React from 'react'

import { debounce } from '../../common'

export const Debounce = () => {
  const [count, setCount] = React.useState(0)

  const callback = React.useCallback(
    debounce(() => setCount(count => count + 1), 1000)
  , [])

  return (
    <>
      <button onClick={() => callback()}>add count</button>
      <div>{count}</div>
    </>
  )
}