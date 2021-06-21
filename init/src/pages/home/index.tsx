import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage: React.FC<{}> = React.memo(() => {
  return (
    <div>
      <Link to="/carousel">轮播图</Link>
      <Link to="/photo-wall">懒加载</Link>
    </div>
  )
})