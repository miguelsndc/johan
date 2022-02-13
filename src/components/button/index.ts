import { styled } from '../../../stitches.config'

const Button = styled('button', {
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

  variants: {
    color: {
      secondary: {
        background: '$gray400',
        '&:hover': {
          background: '$gray500',
        },
      },
      primary: {
        background: '$purple500',
      },
    },
    arrangement: {
      fluid: {
        width: '100%',
      },
      static: {
        minWidth: 105,
      },
    },
  },

  defaultVariants: {
    color: 'primary',
    arrangement: 'fluid',
  },
})

export default Button
