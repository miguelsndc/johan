import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import LoginForm from '.';

describe('components/login-form', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    render(<LoginForm handleSubmit={onSubmit} />);
  });

  it('should start with submit button disabled', () => {
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  it('should allow users to type into the fields and submit the form', async () => {
    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    user.type(emailField, 'john@email.com');
    user.type(passwordField, 'fakePassword123');

    user.click(loginButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'john@email.com',
        password: 'fakePassword123',
      });
    });
  });

  describe('with invalid inputs', () => {
    beforeEach(async () => {
      const emailField = screen.getByLabelText(/email/i);
      const passwordField = screen.getByLabelText(/password/i);

      await waitFor(() => user.type(emailField, 'gh'));
      await waitFor(() => user.type(passwordField, 'gh'));
    });

    it('should display error messages ', () => {
      screen.getAllByRole('alert');
    });

    it('should set the inputs aria-invalid to true', async () => {
      expect(screen.getByLabelText(/email/i)).toBeInvalid();
      expect(screen.getByLabelText(/password/i)).toBeInvalid();
    });

    it('should keep the button disabled', async () => {
      expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
    });
  });
});
