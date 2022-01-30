import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import RegisterForm from '.'

describe('components/register-form', () => {
  const onSubmit = jest.fn()

  beforeEach(() => {
    render(<RegisterForm handleSubmit={onSubmit} />)
  })

  it('should start with submit button disabled', () => {
    const submitButton = screen.getByRole('button', { name: /submit/i })

    expect(submitButton).toBeDisabled()
  })

  it('should allow users to type into the fields and submit the form', async () => {
    const firstNameField = screen.getByLabelText(/first name/i)
    const lastNameField = screen.getByLabelText(/last name/i)
    const emailField = screen.getByLabelText(/email/i)
    const passwordField = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })

    user.type(firstNameField, 'john doe')
    user.type(lastNameField, 'john doe')
    user.type(emailField, 'john@email.com')
    user.type(passwordField, 'fakePassword123')

    user.click(submitButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: 'john doe',
        lastName: 'john doe',
        email: 'john@email.com',
        password: 'fakePassword123',
      })
    })
  })

  describe('with invalid inputs', () => {
    const setupInvalidInputs = () => {
      const firstNameField = screen.getByLabelText(/first name/i)
      const lastNameField = screen.getByLabelText(/last name/i)
      const emailField = screen.getByLabelText(/email/i)
      const passwordField = screen.getByLabelText(/password/i)

      user.type(firstNameField, 'gh')
      user.type(lastNameField, 'gh')
      user.type(emailField, 'gh')
      user.type(passwordField, 'gh')
    }

    it('should display error messages ', async () => {
      setupInvalidInputs()

      await screen.findAllByRole('alert')
    })

    it('should make the inputs invalid', async () => {
      setupInvalidInputs()

      expect(await screen.findByLabelText(/first name/i)).toBeInvalid()
      expect(await screen.findByLabelText(/last name/i)).toBeInvalid()
      expect(await screen.findByLabelText(/email/i)).toBeInvalid()
      expect(await screen.findByLabelText(/password/i)).toBeInvalid()
    })

    it('should keep the button disabled', async () => {
      setupInvalidInputs()

      expect(
        await screen.findByRole('button', { name: /submit/i })
      ).toBeDisabled()
    })
  })
})
