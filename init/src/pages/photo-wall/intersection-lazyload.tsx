import React, { FC, memo, useEffect, useMemo, useRef } from 'react'

import { Container, ImageWrapper, Image } from './style'
import { lazyloadImages } from './utils'

export const IntersectionObserverLazyload: FC<{}> = memo(() => {
  const observerRef = useRef(new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { target, intersectionRatio } = entry

      if (intersectionRatio > 0) {
        const _target = target as HTMLImageElement
        _target.src = _target.dataset['src'] ?? ''

        _target.onload = () => {
          _target.style.opacity = '1'
        }
      }
    })
  }))

  useEffect(() => {
    Array
      .from(document.getElementsByTagName('img'))
      .forEach((img) => observerRef.current.observe(img))

    return () => {
      observerRef.current.disconnect()
    }
  }, [])

  return (
    <Container>
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