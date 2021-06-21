import styled from '@emotion/styled'

export const Container = styled.div({
  position: 'relative',
  width: '300px',
  height: '150px',
  borderRadius: '36px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.3)',
})

export const ImageWrapper = styled.div<{ src: string }>(
  {
    display: 'inline-block',
    width: '300px',
    height: '150px',
  },
  ({ src }) => ({
    backgroundImage: `url("${src}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // opacity: isActive ? 1 : 0,
    // transition: '1s',
  })
)

export const DotContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  width: '100%',
  bottom: '10px',
})

export const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '60px',
  cursor: 'pointer',
})

export const Dot = styled.div({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: 'rgba(53,53,53,0.5)',
  transition: '.3s',

  '&:hover': {
    transform: 'scale(1.2)',
  }
})