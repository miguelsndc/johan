import { styled } from '../../../stitches.config'

export const Container = styled('section', {
  columnCount: 3,
  columnGap: 24,
  maxWidth: 1200,
  marginTop: '1rem',
  marginInline: 'auto',
  padding: '0.75rem',
  width: '100%',
  a: {
    all: 'unset',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  '@media (max-width: 1100px)': {
    columnCount: 2,
  },
  '@media (max-width: 696px)': {
    columnCount: 1,
  },
})

export const ThumbnailWrapper = styled('div', {
  marginBottom: '0.5rem',
  img: {
    borderRadius: 4,
  },
})

export const PostContainer = styled('div', {
  breakInside: 'avoid',
  marginBottom: '3rem',
  border: '1px solid #27272a',
  padding: '0.5rem',
  borderRadius: 4,
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
