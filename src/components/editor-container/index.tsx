import Preview from '../preview'
import Editor from '../editor'
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
      <Editor initialDoc={doc} onChange={onDocChange} />
      <Preview doc={doc} />
    </Wrapper>
  )
}
