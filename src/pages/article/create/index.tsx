import { useCallback, useState } from 'react'

import { MdEditorContainer } from '../../../components'

export default function CreateArticlePage() {
  const [doc, setDoc] = useState('# Hi ')

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return <MdEditorContainer doc={doc} onDocChange={handleDocChange} />
}
