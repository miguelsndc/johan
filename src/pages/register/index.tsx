import { RegisterForm } from '../../components'
import { useAuth } from '../../contexts/auth'

function RegisterPage() {
  const { registerWithEmailAndPassword } = useAuth()

  return (
    <div>
      <RegisterForm handleSubmit={registerWithEmailAndPassword} />
    </div>
  )
}

export default RegisterPage
