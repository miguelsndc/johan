import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Spinner from '../spinner'
import Switch from '../switch'
import { Container, ControlButton } from './styles'

type Props = {
  onSave: (doc: string) => Promise<void>
  onPost: (doc: string) => Promise<void>
  onToggleHeaderVisibility: (current: boolean) => void
  isHeaderHidden: boolean
  doc: string
}

export default function ArticleControls({
  onPost,
  onSave,
  doc,
  onToggleHeaderVisibility,
  isHeaderHidden,
}: Props) {
  const [saving, setSaving] = useState({
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

  const handlePost = () => onPost(doc)

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
      <Link href={`${router.asPath}/preview`} passHref>
        <ControlButton onClick={handlePost} size='fitChildren' as='a'>
          preview
        </ControlButton>
      </Link>
      <ControlButton type='button' onClick={handlePost} color='purple'>
        post
      </ControlButton>
    </Container>
  )
}
