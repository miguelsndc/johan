import * as DialogPrimitive from '@radix-ui/react-dialog'
import { styled } from '../../../stitches.config'

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$gray600',
  opacity: '0.3',
  position: 'fixed',
  inset: 0,
})

const DialogStyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: '0px 2px 12px #a1a1aa',
  position: 'fixed',
  top: '40%',
  padding: 24,
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: 1100,
  maxHeight: '85vh',

  '&:focus': { outline: 'none' },
})

const ProfileDetails = styled('div', {
  display: 'flex',
  gap: '0.75rem',

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

const StyledClose = styled(DialogPrimitive.Close, {
  all: 'unset',
  display: 'block',
  background: '$gray200',
  fontSize: 0,
  padding: 7,
  borderRadius: 6,
  transition: 'background 200ms',
  cursor: 'pointer',
  '&:hover': {
    background: '$gray300',
  },
})

const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const Body = styled('main', {
  margin: '1rem 0 ',
})

const Footer = styled('footer', {
  width: '100%',
  marginTop: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',

  button: {
    display: 'inline',
    width: 100,
    padding: '0.75rem',
    margin: 0,
  },
})

const Textarea = styled('textarea', {
  width: '100%',
  resize: 'none',
  height: 320,
  marginTop: '1rem',
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

// Exports
const Dialog = DialogPrimitive.Root
const DialogClose = StyledClose
const DialogPortal = DialogPrimitive.Portal
const DialogContent = DialogStyledContent
const DialogOverlay = StyledOverlay

export {
  Dialog,
  DialogClose,
  DialogPortal,
  DialogContent,
  DialogOverlay,
  ProfileDetails,
  Header,
  Body,
  Textarea,
  Footer,
}
