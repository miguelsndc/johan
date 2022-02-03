import { useFormik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'
import * as yup from 'yup'
import Button from '../button'
import TextInput from '../text-input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  ProfileDetails,
  Header,
  Body,
  Footer,
  Textarea,
} from './styles'

type User = {
  email: string | null
  photoURL: string | null
  uid: string
  createdAt: string
  firstName: string
  lastName: string
}

type CreatePostDialogProps = {
  isOpened: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
}

type PostFormData = {
  title: string
  body: string
}

const formSchema: yup.SchemaOf<PostFormData> = yup.object().shape({
  body: yup.string().required('Body is required.'),
  title: yup.string().required('Title is required.'),
})

function CreatePostDialog({
  user,
  isOpened,
  onOpenChange,
}: CreatePostDialogProps) {
  const handleClose = () => onOpenChange(false)

  const { errors, handleBlur, handleChange, handleSubmit, touched, values } =
    useFormik({
      initialValues: { title: '', body: '' },
      onSubmit: (formValues) => alert(formValues),
      validationSchema: formSchema,
    })

  return (
    <Dialog open={isOpened} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Header>
            <ProfileDetails>
              <Image
                src={user?.photoURL ? user.photoURL : '/default-user.png'}
                width={48}
                height={48}
              />
              <div>
                <h1>Miguel Nogueira</h1>
                <Link href='/'>See profile</Link>
              </div>
            </ProfileDetails>
            <DialogClose onClick={handleClose}>
              <AiOutlineClose size={20} />
            </DialogClose>
          </Header>
          <Body>
            <form onSubmit={handleSubmit}>
              <TextInput
                label='Title'
                errorMessage={errors.title}
                id='title'
                type='text'
                name='title'
                value={values.title}
                aria-label='title'
                aria-required='true'
                aria-invalid={!!errors.title}
                onChange={handleChange}
                shouldShowErrorMessage={!!(touched.title && errors.title)}
                onBlur={handleBlur}
                required
              />
              <Textarea
                id='body'
                name='body'
                value={values.body}
                onChange={handleChange}
                onBlur={handleBlur}
                spellCheck='false'
              />
              <Footer>
                <Button type='submit'>submit</Button>
              </Footer>
            </form>
          </Body>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default CreatePostDialog
