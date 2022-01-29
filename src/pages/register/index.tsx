import { RegisterForm } from '../../components';

function RegisterPage() {
  async function handleRegister() {}

  return (
    <div>
      <RegisterForm handleSubmit={handleRegister} />
    </div>
  );
}

export default RegisterPage;
