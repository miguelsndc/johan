import { EditorState } from '@codemirror/state'
import { useCallback } from 'react'
import useCodeMirror from '../../hooks/use-codemirror'
import { Container } from './styles'

type Props = {
  initialDoc: string
  onChange: (doc: string) => void
}

export default function MdEditor({ initialDoc, onChange }: Props) {
  const handleEditorChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  )

  const [refContainer] = useCodeMirror<HTMLDivElement>({
    initialDoc,
    onChange: handleEditorChange,
  })

  return <Container ref={refContainer} />
}
