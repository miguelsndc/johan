import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useCallback, useState } from 'react'
import MdEditorContainer from '.'

function MockEditorContainer({ initialDoc }: { initialDoc: string }) {
  const [doc, setDoc] = useState(initialDoc)

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return <MdEditorContainer doc={doc} onDocChange={handleDocChange} />
}

describe('components/editor-container', () => {
  it('editor content should reflect in renderer', () => {
    render(<MockEditorContainer initialDoc='# hello' />)

    expect(screen.getByRole('textbox')).toHaveTextContent('# hello')
    expect(screen.getByTestId('renderer')).toHaveTextContent('hello')
  })

  it('changes on editor should reflect in renderer', async () => {
    render(<MockEditorContainer initialDoc='' />)
    const editor = screen.getByRole('textbox')

    user.type(editor, '# hello')

    expect(editor).toHaveTextContent('# hello')
    expect(await screen.findByTestId('renderer')).toHaveTextContent('hello')
  })
})
