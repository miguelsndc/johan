import { Container, PostButton, SaveButton } from './styles'

type Props = {
  onSave: (doc: string) => void
  onPost: (doc: string) => void
  doc: string
}

export default function ArticleControls({ onPost, onSave, doc }: Props) {
  const handleSave = () => onSave(doc)

  const handlePost = () => onPost(doc)

  return (
    <Container>
      <SaveButton type='button' onClick={handleSave}>
        save
      </SaveButton>
      <PostButton type='button' onClick={handlePost}>
        post
      </PostButton>
    </Container>
  )
}
