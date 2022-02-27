import { styled } from '../../../stitches.config'

const CustomLink = styled('a', {
  color: '$purple500',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
})

const Spacer = styled('div', {
  marginBottom: '0.75rem',
})

export { CustomLink, Spacer }
