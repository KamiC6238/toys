import React, { FC, memo, useEffect, useState, useRef } from 'react'

import { Container, ImageWrapper, DotContainer, Wrapper, Dot } from './style'

interface Props {
  urls: string[]
  offset: number
  delay: number
  transitionTime: number
}

export const Carousel: FC<Props> = memo(({ urls, offset, delay, transitionTime }) => {
  const [curIdx, setCurIdx] = useState(0)
  const [hasTransition, setHasTransition] = useState(true)

  const carouselRef = useRef<HTMLDivElement>(null)
  const curIdxRef = useRef(curIdx)
  const urlsRef = useRef<string[]>(urls)

  const transform = `translateX(-${curIdx * offset}px)`
  const transition = hasTransition ? `${transitionTime / 1000}s` : 'unset'

  useEffect(() => {
    curIdxRef.current = curIdx

    if (curIdx === urlsRef.current.length - 1) {
      const timeout = setTimeout(() => {
        setCurIdx(0)
        setHasTransition(false)
        clearTimeout(timeout)
      }, transitionTime)
    }
  }, [curIdx])

  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = carouselRef.current

      if (carousel) {
        const nextIdx = curIdxRef.current + 1
        const isNotOverLength = nextIdx < urlsRef.current.length

        if (isNotOverLength) {
          setCurIdx(nextIdx)
        } else {
          setCurIdx(0)
        }
        setHasTransition(isNotOverLength)
      }
    }, delay)

    return () => {
      interval && clearInterval(interval)
    }
  }, [delay])

  return (
    <Container>
      <div
        ref={carouselRef}
        style={{ transform, transition }}
      >
        {urls.map((url, index) => (
          <ImageWrapper src={url} key={index} />
        ))}
      </div>
      <DotContainer>
        <Wrapper>
          {urls.map((_, index) => <Dot key={index} />)}
        </Wrapper>
      </DotContainer>
    </Container>
  )
})