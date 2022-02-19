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
  onSave: (doc: string) => Promise<void>
  onPost: (doc: string) => Promise<void>
  onToggleHeaderVisibility: (current: boolean) => void
  isHeaderHidden: boolean
}

export default function EditorContainer({
  doc,
  onDocChange,
  onPost,
  onSave,
  isHeaderHidden,
  onToggleHeaderVisibility,
}: Props) {
  return (
    <Wrapper>
      <ArticleControls
        onSave={onSave}
        onPost={onPost}
        doc={doc}
        onToggleHeaderVisibility={onToggleHeaderVisibility}
        isHeaderHidden={isHeaderHidden}
      />
      <MdEditor
        initialDoc={doc}
        onChange={onDocChange}
        fullHeight={isHeaderHidden}
      />
      <MdRenderer doc={doc} fullHeight={isHeaderHidden} />
    </Wrapper>
  )
}
