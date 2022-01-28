import { RegisterForm } from '../components';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

function Home() {
  const fakeSubmit = async (values: FormData) => {};

  return (
    <div>
      <RegisterForm handleSubmit={fakeSubmit} />
    </div>
  );
}

export default Home;
