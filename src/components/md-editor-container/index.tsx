import MdRenderer from '../md-renderer'
import MdEditor from '../md-editor'
import { styled } from '../../../stitches.config'
import ArticleControls from '../article-controls'

const Wrapper = styled('div', {
  display: 'flex',
  height: '100%',
  position: 'relative',
})

type Props = {
  doc: string
  onDocChange: (newDoc: string) => void
  onSave: (doc: string) => void
  onPost: (doc: string) => void
}

export default function EditorContainer({
  doc,
  onDocChange,
  onPost,
  onSave,
}: Props) {
  return (
    <Wrapper>
      <ArticleControls onSave={onSave} onPost={onPost} doc={doc} />
      <MdEditor initialDoc={doc} onChange={onDocChange} />
      <MdRenderer doc={doc} />
    </Wrapper>
  )
}
