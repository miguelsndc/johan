import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'
import TextInput from '../text-input'
import Button from '../button'

import { Form, Footer } from './styles'
import Spinner from '../spinner'

type FormData = {
  name: string
  email: string
  password: string
}

type RegisterFormProps = {
  handleSubmit: (values: FormData) => Promise<void>
}

const formSchema: yup.SchemaOf<FormData> = yup.object().shape({
  email: yup
    .string()
    .email('Type a valid email.')
    .required('The email field is required.'),
  name: yup
    .string()
    .min(3, 'Name field should be at least 3 characters long.')
    .required('The name field is required.'),
  password: yup
    .string()
    .min(8, 'The password field should be at least 8 characters long.')
    .required('The password field is required.'),
})

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
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    onSubmit: (formValues) => handleSubmit(formValues),
    validationSchema: formSchema,
  })

  return (
    <Form onSubmit={formikSubmitHandler} aria-label='form'>
      <TextInput
        id='name'
        type='text'
        name='name'
        label='Name'
        aria-label='name'
        aria-required='true'
        aria-invalid={!!errors.name}
        value={values.name}
        autoComplete='given-name'
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors.name}
        shouldShowErrorMessage={!!(touched.name && errors.name)}
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
        {isSubmitting ? <Spinner size={15} color='#fff' /> : 'Submit'}
      </Button>
      <Footer>
        <span>Already have an account ?</span>
        <Link href='/login'>login</Link>
      </Footer>
    </Form>
  )
}
