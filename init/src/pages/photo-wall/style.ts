import styled from '@emotion/styled'

export const Container = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gridAutoRows: '300px',
  gap: '1rem',
  padding: '20px',
  background: 'lightblue',
})

export const ImageWrapper = styled.div({
  position: 'relative',
  background: 'rgba(0, 0, 0, .4)',
  borderRadius: '13px',
  transition: '.3s',

  '&:hover': {
    transform: 'translateY(-2px)'
  }
})

export const Image = styled.img(
  {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
)