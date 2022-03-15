import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import ArticleControls from '.'

describe('components/article-controls', () => {
  const onSave = jest.fn().mockResolvedValue({})
  const onPost = jest.fn().mockResolvedValue({})
  const onToggleHeaderVisibility = jest.fn()
  const isHeaderHidden = false
  const doc = 'string'
  const alreadyExistingPost = false

  beforeEach(() => {
    render(
      <ArticleControls
        doc={doc}
        onSave={onSave}
        onPost={onPost}
        onToggleHeaderVisibility={onToggleHeaderVisibility}
        isHeaderHidden={isHeaderHidden}
        alreadyExistingPost={alreadyExistingPost}
      />
    )
  })

  it('should save post on button click', () => {
    const saveButton = screen.getByRole('button', { name: /save/i })

    user.click(saveButton)

    expect(onSave).toHaveBeenCalledWith(doc)
  })

  it('should submit post on button click', () => {
    const postButton = screen.getByRole('button', { name: /post/i })

    user.click(postButton)

    expect(onPost).toHaveBeenCalledWith(doc)
  })
  it('should show controls by default', () => {
    screen.getByTestId('controls-container')
  })
  it('should hide controls on button click', () => {
    const controlsContainer = screen.getByTestId('controls-container')
    const toggleVisibilityButton = screen.getByRole('button', {
      name: /toggle controls visibility/i,
    })

    user.click(toggleVisibilityButton)

    expect(controlsContainer).not.toBeInTheDocument()
  })
})

export default {}
