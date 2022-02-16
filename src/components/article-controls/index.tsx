import Switch from '../switch'
import { Container, PostButton, SaveButton } from './styles'

type Props = {
  onSave: (doc: string) => void
  onPost: (doc: string) => void
  onToggleZenMode: (current: boolean) => void
  isZenModeEnabled: boolean
  doc: string
}

export default function ArticleControls({
  onPost,
  onSave,
  doc,
  onToggleZenMode,
  isZenModeEnabled,
}: Props) {
  const handleSave = () => onSave(doc)

  const handlePost = () => onPost(doc)

  return (
    <Container role='menubar'>
      <Switch
        label='Zen mode'
        checked={isZenModeEnabled}
        defaultChecked={false}
        onCheckedChange={onToggleZenMode}
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
