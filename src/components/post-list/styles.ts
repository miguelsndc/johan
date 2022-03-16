import { styled } from '../../../stitches.config'

export const Container = styled('section', {
  display: 'grid',
  maxWidth: 1100,
  marginTop: '1rem',
  marginInline: 'auto',
  justifyItems: 'center',
  width: '100%',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  rowGap: 30,
})

export const PostContainer = styled('div', {
  display: 'inline-block',
  maxWidth: 350,
  h1: {
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: '0.035em',
    a: {
      color: '$gray50',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
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
