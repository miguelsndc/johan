import { CgSpinnerTwo } from 'react-icons/cg'
import { styled, keyframes } from '../../../stitches.config'

type SpinnerProps = {
  size: number | string
  color: string
}

const rotate = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

const Container = styled('div', {
  svg: {
    animation: `${rotate} infinite linear 1s`,
  },
})

export default function Spinner({ size, color }: SpinnerProps) {
  return (
    <Container>
      <CgSpinnerTwo size={size} color={color} />
    </Container>
  )
}
