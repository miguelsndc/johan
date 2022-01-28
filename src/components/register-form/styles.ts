import { styled } from '../../../stitches.config';

export const Container = styled('div', {
  background: '$gray100',
  height: '100vh',
  padding: '0 1rem',
  display: 'grid',
  placeItems: 'center',
});

export const Form = styled('form', {
  width: '100%',
  maxWidth: 520,
  background: '#fff',
  padding: '1.5rem',
  borderRadius: 6,
  boxShadow: '0px 3px 12px #e4e4e7',
});

export const Button = styled('button', {
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

  '&:hover': {
    background: '$purple600',
  },

  '&:disabled': {
    cursor: 'auto',
    pointerEvents: 'none',
    opacity: '0.5',
  },
});

export const Input = styled('input', {
  width: '100%',
  border: '1px solid $gray300',
  borderRadius: 6,
  padding: '0.75rem 0.5rem',
  fontSize: '1rem',
  fontFamily: '$roboto',
  boxShadow: '0px 2px 12px #f4f4f5',

  '&:focus': {
    outlineColor: '$purple400',
  },
});

export const Title = styled('span', {
  display: 'block',
  marginBottom: '0.3rem',
  fontWeight: '$medium',
});

export const Field = styled('label', {
  display: 'block',

  '& + &': {
    marginTop: '1rem',
  },

  variants: {
    isInvalid: {
      true: {
        [`& ${Input}`]: {
          borderColor: '$red500',
        },
      },
    },
    required: {
      true: {
        [`${Title}::after`]: {
          content: '*',
          color: '$purple400',
        },
      },
    },
  },
});

export const ErrorMessage = styled('span', {
  display: 'block',
  fontSize: '0.875rem',
  marginTop: '0.35rem',
  color: '$red500',
});
