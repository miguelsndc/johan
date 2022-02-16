import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useCallback, useState } from 'react'
import MdEditorContainer from '.'
import Layout from '../layout'

function MockEditorContainer({
  initialDoc,
  onPost,
  onSave,
}: {
  initialDoc: string
  onSave: () => void
  onPost: () => void
}) {
  const [doc, setDoc] = useState(initialDoc)
  const [isZenModeEnabled, setIsZenModeEnabled] = useState(false)

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return (
    <Layout isZenModeEnabled={isZenModeEnabled}>
      <MdEditorContainer
        isZenModeEnabled={isZenModeEnabled}
        onToggleZenMode={setIsZenModeEnabled}
        doc={doc}
        onDocChange={handleDocChange}
        onPost={onPost}
        onSave={onSave}
      />
    </Layout>
  )
}

describe('components/editor-container', () => {
  const save = jest.fn()
  const post = jest.fn()

  it('editor content should reflect in renderer', () => {
    render(
      <MockEditorContainer initialDoc='# hello' onPost={post} onSave={save} />
    )

    expect(screen.getByRole('textbox')).toHaveTextContent('# hello')
    expect(screen.getByTestId('renderer')).toHaveTextContent('hello')
  })

  it('changes on editor should reflect in renderer', async () => {
    render(<MockEditorContainer initialDoc='' onPost={post} onSave={save} />)
    const editor = screen.getByRole('textbox')

    user.type(editor, '# hello')

    expect(editor).toHaveTextContent('# hello')
    expect(await screen.findByTestId('renderer')).toHaveTextContent('hello')
  })

  it('should save post on button click', () => {
    render(<MockEditorContainer initialDoc='' onPost={post} onSave={save} />)
    const saveBtn = screen.getByRole('button', { name: /save/i })

    user.click(saveBtn)

    expect(save).toHaveBeenCalled()
  })

  it('should submit post on button click', () => {
    render(<MockEditorContainer initialDoc='' onPost={post} onSave={save} />)
    const postBtn = screen.getByRole('button', { name: /post/i })

    user.click(postBtn)

    expect(post).toHaveBeenCalled()
  })

  it('should remove header when zen mode is enabled', async () => {
    render(<MockEditorContainer initialDoc='' onPost={post} onSave={save} />)
    const switchButton = screen.getByRole('switch', {
      name: /Toggle zen mode/i,
    })

    user.click(switchButton)

    expect(screen.queryByTestId('header')).not.toBeInTheDocument()
  })
})
