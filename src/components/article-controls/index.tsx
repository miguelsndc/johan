import { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Spinner from '../spinner'
import Switch from '../switch'
import { Container, ControlButton } from './styles'
import type { Post } from '../../types'

type Props = {
  onSave: (doc: string) => Promise<void>
  onPost: (doc: string) => Promise<Post>
  onToggleHeaderVisibility: (current: boolean) => void
  isHeaderHidden: boolean
  doc: string
  alreadyExistingPost?: boolean
}

export default function ArticleControls({
  onPost,
  onSave,
  doc,
  onToggleHeaderVisibility,
  isHeaderHidden,
  alreadyExistingPost,
}: Props) {
  const [saving, setSaving] = useState({
    loading: false,
    error: false,
  })

  const [preview, setPreview] = useState({
    loading: false,
    error: false,
  })

  const router = useRouter()

  const handleSave = () => {
    setSaving((prevState) => ({ ...prevState, loading: true }))

    onSave(doc)
      .then(() =>
        setSaving((prevState) => ({
          ...prevState,
          loading: false,
        }))
      )
      .catch(() => {
        setSaving({ loading: false, error: true })
        setTimeout(() => setSaving({ loading: false, error: false }), 5000)
      })
  }

  const handlePreview = () => {
    setPreview((prevState) => ({ ...prevState, loading: true }))

    onSave(doc)
      .then(() => {
        setPreview((prevState) => ({ ...prevState, loading: false }))
        router.push(`${router.asPath}/preview`)
      })
      .catch(() => setPreview({ error: true, loading: false }))
  }

  const handlePost = () => {
    const toastId = toast.loading('Loading...', {
      style: { minWidth: '300px' },
      duration: 5000,
    })

    onPost(doc)
      .then((post) => {
        if (alreadyExistingPost) {
          toast.success(
            <div>
              <strong>{post.name}</strong> was updated successfully!{' '}
              <p>
                Our articles revalidate every 10 minutes, wait to see the
                changes!
              </p>
              <Link href={`/article/${post.id}`}>View live</Link>
            </div>,
            { id: toastId }
          )

          return
        }

        toast.success(
          <div>
            <strong>{post.name}</strong> was submitted successfully!{' '}
            <Link href={`/article/${post.id}`}>View live</Link>
          </div>,
          { id: toastId }
        )
      })
      .catch(() => {
        toast.error(
          'An error happened while trying to submit your post, try again!',
          {
            id: toastId,
          }
        )
      })
  }

  return (
    <Container role='menubar'>
      <Switch
        label='Hide header'
        checked={isHeaderHidden}
        onCheckedChange={onToggleHeaderVisibility}
      />
      <ControlButton type='button' onClick={handleSave}>
        {saving.loading && <Spinner color='#fff' size={18} />}
        {saving.error && 'Error'}
        {!Object.values(saving).some(Boolean) && 'save'}
      </ControlButton>

      <ControlButton size='fitChildren' onClick={handlePreview}>
        {preview.loading && <Spinner color='#fff' size={18} />}
        {preview.error && 'Error'}
        {!Object.values(preview).some(Boolean) && 'Preview'}
      </ControlButton>

      <ControlButton
        type='button'
        onClick={handlePost}
        color='purple'
        size={alreadyExistingPost ? 'fitChildren' : 'fixed'}
      >
        {alreadyExistingPost ? 'update' : 'post'}
      </ControlButton>
    </Container>
  )
}
