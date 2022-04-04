import { styled } from '../../../stitches.config'

const Title = styled('h1', {
  fontSize: '4rem',
  fontWeight: '$semi',
  fontFamily: '$mono',
  paddingTop: '2rem',
  lineHeight: 1,
  color: '#c9d1d9',

  variants: {
    reduceFontSize: {
      true: {
        fontSize: '3rem',
      },
    },
  },
})

const Wrapper = styled('div', {
  display: 'flex',
  height: '100%',
  position: 'relative',
})

const Header = styled('header', {
  padding: '30px 30px 0 30px',
})

const Description = styled('p', {
  color: '$gray400',
  marginTop: '0.5rem',
  marginBottom: '1rem',
})

const Author = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginTop: '1.5rem',
  img: {
    borderRadius: '50%',
  },
  h2: {
    fontSize: '1.35rem',
    fontWeight: '$medium',
  },
  p: {
    fontSize: '0.875rem',
    color: '$gray400',
  },
})

const RendererWrapper = styled('div', {
  flex: '0 0 53%',
  overflow: 'auto',
  height: '100vh',
  '&::-webkit-scrollbar, &::-webkit-scrollbar-track': {
    background: 'transparent',
    width: 10,
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 8,
    background: '$gray500',
    height: 20,
  },
  variants: {
    isHeaderVisible: {
      true: {
        height: '92vh',
      },
    },
  },
})

const ThumbnailWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  img: {
    borderRadius: 8,
  },
})

export {
  Wrapper,
  Title,
  Header,
  Author,
  RendererWrapper,
  Description,
  ThumbnailWrapper,
}
