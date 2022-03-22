import * as PopoverPrimitive from '@radix-ui/react-popover'
import { keyframes, styled, theme } from '../../../stitches.config'

const Container = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.75rem',
  width: '100%',
  minHeight: '5vh',
  maxHeight: '7vh',
  background: '$purple700',

  '& > div': {
    width: '83%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  h1: {
    fontFamily: '$mono',
    fontSize: '1.75rem',
    color: '#fff',
  },
})

const Menu = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
})

const RoundedButton = styled('button', {
  border: 'none',
  background: '$purple500',
  borderRadius: '50%',
  width: '2.5rem',
  height: '2.5rem',
  cursor: 'pointer',
  fontSize: '0',
  transition: 'background .3s',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    background: '$purple400',
  },

  img: {
    borderRadius: '50%',
  },
})

const ProfileDetails = styled('div', {
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

const Separator = styled('hr', {
  border: 'none',
  height: 1,
  background: '$gray600',
  marginBottom: '0.5rem',
})

const ControlButton = styled('button', {
  border: 'none',
  fontFamily: 'inherit',
  background: '$gray800',
  fontSize: '1rem',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '1rem',
  color: '#fff',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  transition: 'background .2s',

  '&:hover': {
    background: '$gray700',
  },
})

const LinkWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
})

const LinkButton = styled('a', {
  borderRadius: 6,
  textDecoration: 'none',

  width: 95,
  height: 42,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background .2s',

  variants: {
    variant: {
      outlined: {
        border: '2px solid #fff',
        color: '#fff',

        '&:hover': {
          background: '#fff',
          color: '$purple800',
        },
      },
      filled: {
        background: '$purple400',
        color: '#fff',

        '&:hover': {
          background: '$purple300',
        },
      },
    },
  },
})

// Radix

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideUpAndFade = keyframes({
  '0%': { opacity: 1, transform: 'translateY(0)' },
  '100%': { opacity: 0, transform: 'translateY(2px)' },
})

const PopoverStyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: 6,
  width: 260,
  backgroundColor: '$gray800',
  boxShadow: `0px 2px 12px ${theme.colors.gray600}`,
  '&[data-state="open"]': {
    animation: `${slideDownAndFade} 200ms ease-out`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUpAndFade} 200ms ease-in`,
  },
  a: {
    color: '$purple400',
  },
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

const Popover = PopoverPrimitive.Root
const PopoverTrigger = StyledTrigger
const PopoverContent = PopoverStyledContent

export {
  Container,
  Menu,
  RoundedButton,
  ProfileDetails,
  Separator,
  ControlButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  LinkWrapper,
  LinkButton,
}
