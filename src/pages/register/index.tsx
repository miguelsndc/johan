import { useRouter } from 'next/router'
import { styled } from '../../../stitches.config'
import { RegisterForm } from '../../components'
import { useAuth } from '../../contexts/auth'

const Container = styled('div', {
  background: '$gray100',
  height: '100vh',
  padding: '0 1rem',
  display: 'grid',
  placeItems: 'center',
})

function RegisterPage() {
  const { registerWithEmailAndPassword } = useAuth()

  const router = useRouter()

  const handleSubmit = (values: any) =>
    registerWithEmailAndPassword(values).then(() => {
      router.push('/')
    })

  return (
    <Container>
      <RegisterForm handleSubmit={handleSubmit} />
    </Container>
  )
}

export default RegisterPage
