import React from 'react'
import styled from '@emotion/styled'

import { carousel1, carousel2, carousel3 } from '../../assets'
import { Carousel } from '../../components'

const Container = styled.div({})

const images = [carousel1, carousel2, carousel3, carousel1]

export const CarouselDemo: React.FC<{}> = React.memo(() => {
  return (
    <Container>
      <Carousel
        offset={300}
        delay={2000}
        urls={images}
        transitionTime={1000}
      />
    </Container>
  )
})