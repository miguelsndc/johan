import { styled } from '../../../stitches.config'

const ControlButton = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontWeight: 400,
  textTransform: 'capitalize',
  cursor: 'pointer',
  borderRadius: 6,
  width: '3.75rem',
  height: '2.25rem',
  textAlign: 'center',
  transition: 'background .2s',
  '&:focus': {
    outlineStyle: 'auto',
    outlineColor: '$purple400',
  },

  variants: {
    color: {
      gray: {
        background: '$gray600',
        '&:hover': {
          background: '$gray700',
        },
      },
      purple: {
        background: '$purple700',
        '&:hover': {
          background: '$purple800',
        },
      },
    },
    size: {
      fixed: {
        width: '3.75rem',
        height: '2.25rem',
      },
      fitChildren: {
        padding: '0rem 0.65rem',
      },
    },
  },

  defaultVariants: {
    color: 'gray',
    size: 'fixed',
  },
})

const Container = styled('div', {
  position: 'absolute',
  top: 20,
  right: 40,
  display: 'flex',
  gap: '1rem',
  transition: 'opacity 150ms',
})

export { Container, ControlButton }
