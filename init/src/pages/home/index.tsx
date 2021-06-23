import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'

import { HOME, CAROUSEL, GET_BOUNDING_CLIENT_RECT_LAZYLOAD, INTERSECTION_OBSERVER_LAZYLOAD, Promise } from '../../common'

const Container = styled.div({
  '& > a': {
    padding: '10px',
  }
})

export const HomePage: React.FC<{}> = React.memo(() => {
  React.useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      resolve('success')
    })
  
    const p1 = promise.then((value) => {
      console.info('resolve 1: ', value)
      return p1
    })

    p1.then(value => {
      console.log(2)
      console.log('resolve', value)
    }, reason => {
      console.log(3)
      console.log(reason.message)
    }).then().then()
  }, [])

  return (
    <Container>
      <Link to={HOME}>首页</Link>
      <Link to={CAROUSEL}>轮播图</Link>
      <Link to={GET_BOUNDING_CLIENT_RECT_LAZYLOAD}>getBoundingClientRect 懒加载</Link>
      <Link to={INTERSECTION_OBSERVER_LAZYLOAD}>intersection observer 懒加载</Link>
    </Container>
  )
})