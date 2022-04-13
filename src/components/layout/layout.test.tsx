import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { ReactNode } from 'react'
import Layout from '.'
import { authContext, AuthContextValue } from '../../contexts/auth'

const renderWithContext = (ui: ReactNode, providerValue: AuthContextValue) =>
  render(
    <authContext.Provider value={providerValue}>{ui}</authContext.Provider>
  )
describe('components/layout', () => {
  describe('with no user', () => {
    const value = {
      registerWithEmailAndPassword: jest.fn(),
      signInWithEmailAndPassword: jest.fn(),
      signOut: jest.fn(),
      user: null,
    }

    it('should show login and register button on header', () => {
      renderWithContext(<Layout>.</Layout>, value)

      expect(
        screen.getByRole('link', { name: /register/i })
      ).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
    })

    it('should show the unsigned dialog on create post button click', async () => {
      renderWithContext(<Layout>.</Layout>, value)

      const createPostButton = screen.getByRole('button', {
        name: /create post/i,
      })

      user.click(createPostButton)

      const unsignedDialog = await screen.findByRole('dialog')

      expect(unsignedDialog).toHaveAccessibleDescription(
        "Hmmm... looks like you're trying to create a post without being signed in..."
      )
      expect(unsignedDialog).toHaveAccessibleName(
        'You must be signed to create a new post !'
      )
    })
  })

  describe('with a logged user', () => {
    const value = {
      registerWithEmailAndPassword: jest.fn(),
      signInWithEmailAndPassword: jest.fn(),
      signOut: jest.fn(),
      user: {
        email: 'mock@mail.com',
        photoURL: '',
        uid: 'uid123',
        createdAt: 'today',
        name: 'John ',
      },
    }

    it('should show the user profile button', () => {
      renderWithContext(<Layout>.</Layout>, value)

      expect(
        screen.getByRole('button', { name: /show profile details/i })
      ).toBeInTheDocument()
    })

    it('should show the create post dialog on create post button click', async () => {
      renderWithContext(<Layout>.</Layout>, value)

      const createPostButton = screen.getByRole('button', {
        name: /create post/i,
      })

      user.click(createPostButton)

      const createPostDialog = await screen.findByRole('dialog')

      expect(createPostDialog).toHaveAccessibleDescription(
        'Name your draft to start working. Try adding a tiny description so the final result looks prettier'
      )
      expect(createPostDialog).toHaveAccessibleName(
        'So you want to create a new post ?'
      )
    })
  })
})
