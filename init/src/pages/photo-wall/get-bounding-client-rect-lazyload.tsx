import { throttle } from 'lodash'
import React from 'react'

import { Container, ImageWrapper, Image } from './style'
import { lazyloadImages } from './utils'

export const GetBoundingClientRectDemo: React.FC<{}> = React.memo(() => {
  const ref = React.useRef<HTMLDivElement | null>(null)

  const showImageIfNeed = React.useCallback(() => {
    if (ref.current) {
      Array.from(ref.current.getElementsByTagName('img')).forEach(imgNode => {
        const { top, bottom } = imgNode.getBoundingClientRect()
        const documentHeight = document.body.clientHeight

        if (top < documentHeight && bottom > 0) {
          const dataSrc = imgNode.dataset['src']

          imgNode.onload = () => {
            imgNode.style.opacity = '1'
          }
          
          if (dataSrc) {
            imgNode.src = dataSrc
          }
        }
      })
    }
  }, [])

  React.useEffect(() => {
    // first render
    showImageIfNeed()
  }, [])

  React.useEffect(() => {
    document.addEventListener('scroll', throttle(() => {
      showImageIfNeed()
    }, 1000))
  }, [])

  return (
    <Container ref={ref}>
      {lazyloadImages.map((image, index) => (
        <ImageWrapper>
          <Image
            key={index}
            src={undefined}
            data-src={image}
            alt={`${index}`}
            style={{ opacity: '0', transition: '.3s' }}
          />
        </ImageWrapper>
      ))}
    </Container>
  )
})