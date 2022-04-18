import { styled } from '../../../stitches.config'

export const Container = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1rem',
  justifyItems: 'center',
  maxWidth: 1100,
  marginTop: '1rem',
  padding: '0 1rem',
  marginInline: 'auto',
  width: '100%',
  a: {
    all: 'unset',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  '@media (max-width: 1100px)': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@media (max-width: 696px)': {
    gridTemplateColumns: '1fr',
  },
})

export const ThumbnailWrapper = styled('div', {
  marginBottom: '0.5rem',
  img: {
    borderRadius: 4,
  },
})

export const PostContainer = styled('div', {
  maxWidth: 550,

  h1: {
    fontSize: '2rem',
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: '0.035em',
    color: '$gray50',
    fontFamily: '$mono',
  },
  p: {
    color: '$gray400',
    marginTop: '0.5rem',
    marginBottom: '0.85rem',
  },
})

export const AuthorInformation = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  img: {
    borderRadius: '50%',
  },
  h2: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '$gray200',
  },
  h3: {
    fontSize: '0.875rem',
    fontWeight: 400,
    color: '$gray400',
  },
})
