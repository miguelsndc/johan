import { styled, keyframes } from '@stitches/react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 0.5 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$gray900',
  opacity: 0.7,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
})

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '550px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
  color: '$gray900',
})

const StyledTitle = styled(DialogPrimitive.Title, {
  fontWeight: 500,
  fontSize: '1.45rem',
})

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 18px',
  color: '$gray500',
  fontSize: 15,
  lineHeight: 1.5,
})

const StyledClose = styled(DialogPrimitive.Close, {
  border: 'none',
  position: 'absolute',
  top: 12,
  right: 12,
  display: 'block',
  padding: '0.4rem',
  borderRadius: 6,
  background: '$gray200',
  fontSize: 0,
  cursor: 'pointer',
  transition: 'background .2s',
  '&:focus': {
    outlineColor: '$gray600',
  },
  '&:hover': {
    background: '$gray300',
  },
})

// Exports
const Dialog = DialogPrimitive.Root
const DialogContent = StyledContent
const DialogTitle = StyledTitle
const DialogOverlay = StyledOverlay
const DialogDescription = StyledDescription
const DialogClose = StyledClose
const DialogPortal = DialogPrimitive.Portal

export {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
  DialogDescription,
  DialogClose,
  DialogPortal,
}
