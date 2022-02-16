import * as SwitchPrimitives from '@radix-ui/react-switch'
import { styled } from '../../../stitches.config'

const StyledSwitch = styled(SwitchPrimitives.Root, {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '$gray600',
  borderRadius: '9999px',
  position: 'relative',
  boxShadow: `0 2px 10px $purple800`,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&:focus': { boxShadow: `0 0 0 2px $gray200` },
  '&[data-state="checked"]': { backgroundColor: '$purple600' },
  cursor: 'pointer',
})

const StyledThumb = styled(SwitchPrimitives.Thumb, {
  display: 'block',
  width: 22,
  height: 22,
  backgroundColor: 'white',
  borderRadius: '9999px',
  boxShadow: `0 2px 2px $gray300`,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
})

const Label = styled('span', {
  color: '#fff',
  fontWeight: 500,
})

const Container = styled('label', {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
})

const Switch = StyledSwitch
const SwitchThumb = StyledThumb

export { Switch, SwitchThumb, Label, Container }
