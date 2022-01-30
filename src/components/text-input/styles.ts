import { styled } from '../../../stitches.config'

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
})

export const Title = styled('span', {
  display: 'block',
  marginBottom: '0.3rem',
  fontWeight: '$medium',
})

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
})

export const ErrorMessage = styled('span', {
  display: 'block',
  fontSize: '0.875rem',
  marginTop: '0.35rem',
  color: '$red500',
})
