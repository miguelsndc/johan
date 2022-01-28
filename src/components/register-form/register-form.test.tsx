import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import RegisterForm from '.';

describe('components/register-form', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    render(<RegisterForm handleSubmit={onSubmit} />);
  });

  it('should start with submit button disabled', () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(submitButton).toBeDisabled();
  });

  it('should allow users to type into the fields and submit the form', async () => {
    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameField = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    user.type(firstNameField, 'john doe');
    user.type(lastNameField, 'john doe');
    user.type(emailField, 'john@email.com');
    user.type(passwordField, 'fakePassword123');

    user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: 'john doe',
        lastName: 'john doe',
        email: 'john@email.com',
        password: 'fakePassword123',
      });
    });
  });

  describe('with invalid inputs', () => {
    beforeEach(async () => {
      const firstNameField = screen.getByLabelText(/first name/i);
      const lastNameField = screen.getByLabelText(/last name/i);
      const emailField = screen.getByLabelText(/email/i);
      const passwordField = screen.getByLabelText(/password/i);

      await waitFor(() => user.type(firstNameField, 'gh'));
      await waitFor(() => user.type(lastNameField, 'gh'));
      await waitFor(() => user.type(emailField, 'gh'));
      await waitFor(() => user.type(passwordField, 'gh'));
    });

    it('should display error messages ', () => {
      screen.getAllByRole('alert');
    });

    it('should set the inputs aria-invalid to true', async () => {
      expect(screen.getByLabelText(/first name/i)).toBeInvalid();
      expect(screen.getByLabelText(/last name/i)).toBeInvalid();
      expect(screen.getByLabelText(/email/i)).toBeInvalid();
      expect(screen.getByLabelText(/password/i)).toBeInvalid();
    });

    it('should keep the button disabled', async () => {
      expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    });
  });
});
