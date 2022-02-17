import { useState } from 'react'
import Spinner from '../spinner'
import Switch from '../switch'
import { Container, PostButton, SaveButton } from './styles'

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
        defaultChecked={false}
        onCheckedChange={onToggleHeaderVisibility}
      />
      <SaveButton type='button' onClick={handleSave}>
        {saving.loading && <Spinner color='#fff' size={18} />}
        {saving.error && 'Error'}
        {!Object.values(saving).some(Boolean) && 'save'}
      </SaveButton>
      <PostButton type='button' onClick={handlePost}>
        post
      </PostButton>
    </Container>
  )
}
