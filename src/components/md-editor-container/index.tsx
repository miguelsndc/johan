import MdRenderer from '../md-renderer'
import MdEditor from '../md-editor'
import { styled } from '../../../stitches.config'

const Wrapper = styled('div', {
  display: 'flex',
  height: '100%',
})

type Props = {
  doc: string
  onDocChange: (newDoc: string) => void
}

export default function EditorContainer({ doc, onDocChange }: Props) {
  return (
    <Wrapper>
      <MdEditor initialDoc={doc} onChange={onDocChange} />
      <MdRenderer doc={doc} />
    </Wrapper>
  )
}
