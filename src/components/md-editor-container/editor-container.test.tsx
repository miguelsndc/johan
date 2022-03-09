import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useCallback, useState } from 'react'
import MdEditorContainer from '.'
import { Post } from '../../types'
import Layout from '../layout'

// polyfill
document.createRange = () => {
  const range = new Range()

  range.getBoundingClientRect = jest.fn()

  range.getClientRects = () => ({
    item: () => null,
    length: 0,
    [Symbol.iterator]: jest.fn(),
  })

  return range
}

function MockEditorContainer({
  initialDoc,
  onPost,
  onSave,
}: {
  initialDoc: string
  onSave: () => Promise<void>
  onPost: () => Promise<Post>
}) {
  const [doc, setDoc] = useState(initialDoc)
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  return (
    <Layout isHeaderHidden={isHeaderHidden}>
      <MdEditorContainer
        isHeaderHidden={isHeaderHidden}
        onToggleHeaderVisibility={setIsHeaderHidden}
        doc={doc}
        onDocChange={handleDocChange}
        onPost={onPost}
        onSave={onSave}
      />
    </Layout>
  )
}

describe('components/editor-container', () => {
  const save = jest.fn(() => Promise.resolve())
  const post = jest.fn(() => Promise.resolve({} as Post))

  jest.useFakeTimers()

  it('editor content should reflect in renderer', async () => {
    render(
      <MockEditorContainer initialDoc='# hello' onPost={post} onSave={save} />
    )

    expect(await screen.findByRole('textbox')).toHaveTextContent('# hello')
    expect(screen.getByTestId('renderer')).toHaveTextContent('hello')
  })

  it('changes on editor should reflect in renderer', async () => {
    render(<MockEditorContainer initialDoc='' onPost={post} onSave={save} />)
    const editor = await screen.findByRole('textbox')

    user.type(editor, '# hello')

    jest.runAllTimers()

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
    const postBtn = screen.getByRole('button', { name: 'post' })

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
