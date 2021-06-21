import styled from '@emotion/styled'

export const Container = styled.div({
  display: 'grid'
})

export const Image = styled.div<{ src: string }>(
  {
    minWidth: '200px',
    minHeight: '200px',
    maxWidth: '300px',
    maxHeight: '300px',
    background: 'rgba(53, 53, 53, .4)',
  },
  ({ src }) => ({
    backgroundImage: `url("${src}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  })
)