import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '../button'
import Dialog from '../dialog'
import Spinner from '../spinner'
import TextInput from '../text-input'
import { Footer } from './styles'

type Props = {
  open: boolean
  onClose: () => void
  onOpenChange: (open: boolean) => void
  onConfirm: (draftName: string) => Promise<void>
}

type FormData = {
  draftName: string
}

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  draftName: yup.string().required('A name is required to start working.'),
})

export default function ArticleCreationDialog({
  onClose,
  onOpenChange,
  open,
  onConfirm,
}: Props) {
  const {
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: { draftName: '' },
    onSubmit: async (formValues) => {
      await onConfirm(formValues.draftName)
      resetForm()
    },
    validationSchema: schema,
  })

  return (
    <Dialog
      onClose={onClose}
      onOpenChange={onOpenChange}
      open={open}
      title='So you want to create a new post ?'
      description='Name your draft to start working'
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          label='Draft name'
          errorMessage={errors.draftName}
          id='draftName'
          type='text'
          name='draftName'
          value={values.draftName}
          aria-label='draftName'
          aria-required='true'
          aria-invalid={!!errors.draftName}
          onChange={handleChange}
          shouldShowErrorMessage={!!(touched.draftName && errors.draftName)}
          onBlur={handleBlur}
          required
        />
        <Footer>
          <Button
            color='secondary'
            arrangement='static'
            type='button'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button arrangement='static' type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <Spinner size={16} color='#fff' />
            ) : (
              'Start Working'
            )}
          </Button>
        </Footer>
      </form>
    </Dialog>
  )
}