import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'

import { HOME, CAROUSEL, GET_BOUNDING_CLIENT_RECT_LAZYLOAD, INTERSECTION_OBSERVER_LAZYLOAD, THROTTLE, DEBOUNCE } from '../../common'

const Container = styled.div({
  '& > a': {
    padding: '10px',
  }
})

export const HomePage: React.FC<{}> = React.memo(() => {
  return (
    <Container>
      <Link to={HOME}>首页</Link>
      <Link to={CAROUSEL}>轮播图</Link>
      <Link to={GET_BOUNDING_CLIENT_RECT_LAZYLOAD}>getBoundingClientRect 懒加载</Link>
      <Link to={INTERSECTION_OBSERVER_LAZYLOAD}>intersection observer 懒加载</Link>
      <Link to={THROTTLE}>节流</Link>
      <Link to={DEBOUNCE}>防抖</Link>
    </Container>
  )
})  