import LoginForm from '../../components/login-form';

export default function LoginPage() {
  async function handleLogin() {}

  return (
    <div>
      <LoginForm handleSubmit={handleLogin} />
    </div>
  );
}
