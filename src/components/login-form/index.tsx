import { useFormik } from 'formik';
import Link from 'next/link';
import * as yup from 'yup';
import TextInput from '../text-input';
import Button from '../button';
import { Container, Footer, Form } from './styles';

type FormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  handleSubmit: (values: FormData) => Promise<void>;
};

const formSchema: yup.SchemaOf<FormData> = yup.object().shape({
  email: yup
    .string()
    .email('Type a valid email.')
    .required('The email field is required.'),
  password: yup
    .string()
    .min(8, 'The password field should be at least 8 characters long.')
    .required('The password field is required.'),
});

export default function LoginForm({ handleSubmit }: LoginFormProps) {
  const {
    errors,
    handleBlur,
    isSubmitting,
    handleChange,
    touched,
    values,
    isValid,
    dirty,
    handleSubmit: formikSubmitHandler,
  } = useFormik<FormData>({
    initialValues: { email: '', password: '' },
    onSubmit: values => handleSubmit(values),
    validationSchema: formSchema,
  });

  return (
    <Container>
      <Form onSubmit={formikSubmitHandler} aria-label='form'>
        <TextInput
          label='Email'
          errorMessage={errors.email}
          id='email'
          type='text'
          name='email'
          value={values.email}
          autoComplete='email'
          aria-label='email'
          aria-required='true'
          aria-invalid={!!errors.email}
          onChange={handleChange}
          shouldShowErrorMessage={!!(touched.email && errors.email)}
          onBlur={handleBlur}
          required
        />

        <TextInput
          label='Password'
          errorMessage={errors.password}
          id='password'
          type='password'
          name='password'
          value={values.password}
          autoComplete='new-password'
          aria-label='password'
          aria-required='true'
          aria-invalid={!!errors.password}
          shouldShowErrorMessage={!!(touched.password && errors.password)}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <Button disabled={!(isValid && dirty) || isSubmitting} type='submit'>
          login
        </Button>
        <Footer>
          <span>Don't have an account yet ?</span>
          <Link href='/register'>register</Link>
        </Footer>
      </Form>
    </Container>
  );
}
