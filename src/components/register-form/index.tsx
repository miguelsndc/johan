import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import TextInput from '../text-input';
import Button from '../button';

import { Container, Form, Footer } from './styles';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type RegisterFormProps = {
  handleSubmit: (values: FormData) => Promise<void>;
};

const formSchema: yup.SchemaOf<FormData> = yup.object().shape({
  email: yup
    .string()
    .email('Type a valid email.')
    .required('The email field is required.'),
  firstName: yup
    .string()
    .min(3, 'First name field should be at least 3 characters long.')
    .required('The first name field is required.'),
  lastName: yup
    .string()
    .min(3, 'Last name field should be at least 3 characters long.')
    .required('The last name field is required.'),
  password: yup
    .string()
    .min(8, 'The password field should be at least 8 characters long.')
    .required('The password field is required.'),
});

export default function RegisterForm({ handleSubmit }: RegisterFormProps) {
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
    initialValues: { email: '', firstName: '', lastName: '', password: '' },
    onSubmit: values => handleSubmit(values),
    validationSchema: formSchema,
  });

  return (
    <Container>
      <Form onSubmit={formikSubmitHandler} aria-label='form'>
        <TextInput
          id='firstName'
          type='text'
          name='firstName'
          label='First name'
          aria-label='first name'
          aria-required='true'
          aria-invalid={!!errors.firstName}
          value={values.firstName}
          autoComplete='given-name'
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.firstName}
          shouldShowErrorMessage={!!(touched.firstName && errors.firstName)}
          required
        />

        <TextInput
          id='lastName'
          type='text'
          name='lastName'
          label='Last name'
          value={values.lastName}
          autoComplete='family-name'
          aria-required='true'
          aria-label='last name'
          aria-invalid={!!errors.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          shouldShowErrorMessage={!!(touched.lastName && errors.lastName)}
          errorMessage={errors.lastName}
          required
        />

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
          Submit
        </Button>
        <Footer>
          <span>Already have an account ?</span>
          <Link href='/login'>login</Link>
        </Footer>
      </Form>
    </Container>
  );
}
