import { styled } from '../../../stitches.config'

const Button = styled('button', {
  width: '100%',
  color: '#fff',
  background: '$purple500',
  border: 'none',
  borderRadius: 6,
  fontFamily: '$roboto',
  padding: '1rem 0.75rem',
  transition: 'background .2s',
  cursor: 'pointer',
  fontSize: '1rem',
  marginTop: '1rem',
  textTransform: 'capitalize',

  '&:hover': {
    background: '$purple600',
  },

  '&:disabled': {
    cursor: 'auto',
    pointerEvents: 'none',
    opacity: '0.5',
  },
})

export default Button
