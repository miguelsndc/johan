import { styled } from '../../../stitches.config'

export const Container = styled('section', {
  display: 'grid',
  maxWidth: 1100,
  marginTop: '1rem',
  marginInline: 'auto',
  width: '100%',
  gridTemplateColumns: '1fr 1fr',
  rowGap: 30,
  a: {
    all: 'unset',
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const PostContainer = styled('div', {
  h1: {
    fontSize: '3rem',
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
