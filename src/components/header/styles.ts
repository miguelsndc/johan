import * as PopoverPrimitive from '@radix-ui/react-popover'
import { styled } from '../../../stitches.config'

export const Container = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '7vh',
  background: '$purple700',

  '& > div': {
    width: '83%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  h1: {
    fontFamily: '$mono',
    color: '#fff',
  },
})

export const ButtonWrapper = styled('div', {
  display: 'flex',
  gap: '1rem',
})

export const RoundedButton = styled('button', {
  border: 'none',
  background: '$purple500',
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  cursor: 'pointer',
  fontSize: '0',
  transition: 'background .3s',

  '&:hover': {
    background: '$purple400',
  },

  img: {
    borderRadius: '50%',
  },
})

export const ProfileDetails = styled('div', {
  display: 'flex',
  gap: '0.75rem',
  padding: '1rem 10px',

  h1: {
    fontSize: '1.15rem',
    fontWeight: '$medium',
    marginBottom: '0.15rem',
  },

  a: {
    color: '$purple500',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  span: {
    width: '3rem',
    height: '3rem',
    img: {
      borderRadius: '50%',
    },
  },
})

export const Separator = styled('hr', {
  border: 'none',
  height: 1,
  background: '$gray100',
  marginBottom: '0.5rem',
})

export const ControlButton = styled('button', {
  border: 'none',
  fontFamily: 'inherit',
  background: '#fff',
  fontSize: '1rem',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '1rem',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  transition: 'background .2s',

  '&:hover': {
    background: '$gray100',
  },
})

// Radix

const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: 4,
  width: 260,
  backgroundColor: 'white',
  boxShadow: '0px 2px 12px #d4d4d8',
})

const StyledTrigger = styled(PopoverPrimitive.Trigger, {
  border: 'none',
  background: '$purple500',
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  cursor: 'pointer',
  fontSize: '0',
  transition: 'background .3s',

  '&:hover': {
    background: '$purple400',
  },

  img: {
    borderRadius: '50%',
  },
})

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = StyledTrigger
export const PopoverContent = StyledContent