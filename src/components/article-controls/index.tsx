import Switch from '../switch'
import { Container, PostButton, SaveButton } from './styles'

type Props = {
  onSave: (doc: string) => void
  onPost: (doc: string) => void
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
  const handleSave = () => onSave(doc)

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
        save
      </SaveButton>
      <PostButton type='button' onClick={handlePost}>
        post
      </PostButton>
    </Container>
  )
}
