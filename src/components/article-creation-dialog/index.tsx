import { useFormik } from 'formik'
import * as yup from 'yup'
import Button from '../button'
import Dialog from '../dialog'
import Spinner from '../spinner'
import TextInput from '../text-input'
import { Footer } from './styles'

export type NewDraftData = {
  name: string
  description?: string
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (draft: NewDraftData) => Promise<void>
}

const schema: yup.SchemaOf<NewDraftData> = yup.object().shape({
  name: yup.string().required('A name is required to start working.'),
  description: yup
    .string()
    .max(150, "A description shouldn't be more than 150 characters long.")
    .optional(),
})

export default function ArticleCreationDialog({
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
  } = useFormik({
    initialValues: { name: '', description: '' },
    onSubmit: async (formValues) => onConfirm(formValues),
    validationSchema: schema,
  })

  return (
    <Dialog
      onClose={() => onOpenChange(false)}
      onOpenChange={onOpenChange}
      open={open}
      title='So you want to create a new post ?'
      description='Name your draft to start working. Try adding a tiny description so the final result looks prettier'
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          label='Name:'
          errorMessage={errors.name}
          id='name'
          type='text'
          name='name'
          value={values.name}
          aria-label='name'
          aria-required='true'
          aria-invalid={!!errors.name}
          onChange={handleChange}
          shouldShowErrorMessage={!!(touched.name && errors.name)}
          onBlur={handleBlur}
          required
        />
        <TextInput
          label='Description:'
          errorMessage={errors.description}
          id='description'
          type='text'
          name='description'
          value={values.description}
          aria-label='description'
          aria-invalid={!!errors.description}
          onChange={handleChange}
          shouldShowErrorMessage={!!(touched.description && errors.description)}
          onBlur={handleBlur}
        />
        <Footer>
          <Button
            color='secondary'
            arrangement='static'
            type='button'
            onClick={() => onOpenChange(false)}
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
