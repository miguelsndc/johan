import { styled } from '../../../stitches.config'

export const Form = styled('form', {
  width: '100%',
  maxWidth: 520,
  background: '#fff',
  padding: '1.5rem',
  borderRadius: 6,
  boxShadow: '0px 3px 12px #e4e4e7',
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
