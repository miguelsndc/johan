import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import LoginForm from '.'

describe('components/login-form', () => {
  const onSubmit = jest.fn()

  beforeEach(() => {
    render(<LoginForm handleSubmit={onSubmit} />)
  })

  it('should start with submit button disabled', () => {
    const loginButton = screen.getByRole('button', { name: /login/i })
    expect(loginButton).toBeDisabled()
  })

  it('should allow users to type into the fields and submit the form', async () => {
    const emailField = screen.getByLabelText(/email/i)
    const passwordField = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    user.type(emailField, 'john@email.com')
    user.type(passwordField, 'fakePassword123')

    user.click(loginButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'john@email.com',
        password: 'fakePassword123',
      })
    })
  })

  describe('with invalid inputs', () => {
    const setupInvalidInputs = () => {
      const emailField = screen.getByLabelText(/email/i)
      const passwordField = screen.getByLabelText(/password/i)

      user.type(emailField, 'gh')
      user.type(passwordField, 'gh')
    }

    it('should display error messages ', async () => {
      setupInvalidInputs()

      await screen.findAllByRole('alert')
    })

    it('should make the inputs invalid', async () => {
      setupInvalidInputs()

      expect(await screen.findByLabelText(/email/i)).toBeInvalid()
      expect(await screen.findByLabelText(/password/i)).toBeInvalid()
    })

    it('should keep the button disabled', async () => {
      setupInvalidInputs()

      expect(
        await screen.findByRole('button', { name: /login/i })
      ).toBeDisabled()
    })
  })
})
