import { useCallback, useState } from 'react'

import EditorContainer from '../../../components/editor-container'

export default function CreateArticlePage() {
  const [doc, setDoc] = useState('# Hi ')

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return <EditorContainer doc={doc} onDocChange={handleDocChange} />
}
