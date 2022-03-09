import { styled } from '../../../stitches.config'

export const Form = styled('form', {
  width: '100%',
  maxWidth: 520,
  padding: '1.5rem',
  borderRadius: 6,
  background: '$gray800',
  color: '#fff',
  boxShadow: '0px 3px 12px #27272a',
})

export const Footer = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '1rem',

  span: {
    color: '$gray500',
  },

  a: {
    textDecoration: 'none',
    color: '$purple500',
    fontWeight: '$medium',
    textTransform: 'capitalize',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
})
