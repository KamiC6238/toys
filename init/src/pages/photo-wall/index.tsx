import React from 'react'

import { Container, Image } from './style'
import { lazyloadImages } from './utils'

export const PhotoWallDemo: React.FC<{}> = React.memo(() => {
  return (
    <Container>
      {lazyloadImages.map((image, index) => <Image src={image} key={index} />)}
    </Container>
  )
})