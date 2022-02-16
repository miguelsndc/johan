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
  onToggleZenMode: (current: boolean) => void
  isZenModeEnabled: boolean
}

export default function EditorContainer({
  doc,
  onDocChange,
  onPost,
  onSave,
  isZenModeEnabled,
  onToggleZenMode,
}: Props) {
  return (
    <Wrapper>
      <ArticleControls
        onSave={onSave}
        onPost={onPost}
        doc={doc}
        onToggleZenMode={onToggleZenMode}
        isZenModeEnabled={isZenModeEnabled}
      />
      <MdEditor
        initialDoc={doc}
        onChange={onDocChange}
        isZenModeEnabled={isZenModeEnabled}
      />
      <MdRenderer doc={doc} isZenModeEnabled={isZenModeEnabled} />
    </Wrapper>
  )
}
