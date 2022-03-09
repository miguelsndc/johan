import { styled } from '../../../stitches.config'
import { RegisterForm } from '../../components'
import { useAuth } from '../../contexts/auth'

const Container = styled('div', {
  height: '100vh',
  padding: '0 1rem',
  display: 'grid',
  placeItems: 'center',
})

function RegisterPage() {
  const { registerWithEmailAndPassword } = useAuth()

  return (
    <Container>
      <RegisterForm handleSubmit={registerWithEmailAndPassword} />
    </Container>
  )
}

export default RegisterPage
