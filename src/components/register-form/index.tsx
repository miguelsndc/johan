import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Container,
  Field,
  Form,
  ErrorMessage,
  Button,
  Title,
  Input,
} from './styles';

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
        <Field isInvalid={!!(touched.firstName && errors.firstName)} required>
          <Title>First name</Title>
          <Input
            id='firstName'
            type='text'
            name='firstName'
            autoComplete='given-name'
            value={values.firstName}
            aria-label='first name'
            aria-required='true'
            aria-invalid={!!errors.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.firstName && errors.firstName && (
            <ErrorMessage role='alert'>{errors.firstName}</ErrorMessage>
          )}
        </Field>
        <Field isInvalid={!!(touched.lastName && errors.lastName)} required>
          <Title>Last name</Title>
          <Input
            id='lastName'
            type='text'
            name='lastName'
            value={values.lastName}
            autoComplete='family-name'
            aria-required='true'
            aria-label='last name'
            aria-invalid={!!errors.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.lastName && errors.lastName && (
            <ErrorMessage role='alert'>{errors.lastName}</ErrorMessage>
          )}
        </Field>
        <Field isInvalid={!!(touched.email && errors.email)} required>
          <Title>Email</Title>
          <Input
            id='email'
            type='text'
            name='email'
            value={values.email}
            autoComplete='email'
            aria-label='email'
            aria-required='true'
            aria-invalid={!!errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <ErrorMessage role='alert'>{errors.email}</ErrorMessage>
          )}
        </Field>
        <Field isInvalid={!!(touched.password && errors.password)} required>
          <Title>Password</Title>
          <Input
            id='password'
            type='password'
            name='password'
            value={values.password}
            autoComplete='new-password'
            aria-label='password'
            aria-required='true'
            aria-invalid={!!errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <ErrorMessage role='alert'>{errors.password}</ErrorMessage>
          )}
        </Field>
        <Button disabled={!(isValid && dirty)} type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
}
