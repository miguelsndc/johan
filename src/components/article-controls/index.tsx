import { useState, ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  BsThreeDotsVertical,
  BsXLg,
  BsFileEarmarkArrowUp,
} from 'react-icons/bs'
import Spinner from '../spinner'
import Switch from '../switch'
import { Container, ControlButton } from './styles'
import type { Post } from '../../types'

type Props = {
  onSave: (doc: string) => Promise<void>
  onPost: (doc: string, thumbnail?: string) => Promise<Post>
  onToggleHeaderVisibility: (current: boolean) => void
  handleChooseThumbnail?: (e: ChangeEvent<HTMLInputElement>) => void
  isHeaderHidden: boolean
  doc: string
  alreadyExistingPost?: boolean
  thumbnail?: string
}

export default function ArticleControls({
  onPost,
  onSave,
  doc,
  onToggleHeaderVisibility,
  isHeaderHidden,
  alreadyExistingPost,
  handleChooseThumbnail,
  thumbnail,
}: Props) {
  const [saving, setSaving] = useState({
    loading: false,
    error: false,
  })

  const [areControlsHidden, setAreControlsHidden] = useState(false)
  const router = useRouter()

  const handleToggleControlsVisibility = () =>
    setAreControlsHidden((prevState) => !prevState)

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

  const handlePost = () => {
    const toastId = toast.loading('Loading...', {
      style: { minWidth: '300px' },
      duration: 5000,
    })

    onPost(doc, thumbnail)
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
      {areControlsHidden || (
        <div data-testid='controls-container'>
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

          <Link href={`${router.asPath}/preview`} passHref>
            <ControlButton size='fitChildren' as='a'>
              Preview
            </ControlButton>
          </Link>

          <ControlButton
            type='button'
            onClick={handlePost}
            color='purple'
            size={alreadyExistingPost ? 'fitChildren' : 'fixed'}
          >
            {alreadyExistingPost ? 'update' : 'post'}
          </ControlButton>

          <ControlButton
            as='label'
            color='gray'
            size='rounded'
            aria-label='toggle controls visibility'
          >
            <input
              type='file'
              accept='image/*'
              onChange={handleChooseThumbnail}
            />
            <BsFileEarmarkArrowUp />
          </ControlButton>
        </div>
      )}

      <ControlButton
        type='button'
        onClick={handleToggleControlsVisibility}
        color='gray'
        size='rounded'
        aria-label='toggle controls visibility'
      >
        {areControlsHidden ? <BsThreeDotsVertical /> : <BsXLg />}
      </ControlButton>
    </Container>
  )
}
