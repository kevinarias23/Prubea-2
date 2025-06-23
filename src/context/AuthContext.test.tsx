import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import React, { useState } from 'react';

describe('AuthContext', () => {
  const TestComponent = () => {
    const { isAuthenticated, user, login, logout } = useAuth();
    const [loginError, setLoginError] = useState<string | null>(null);

    const handleLogin = async () => {
      const success = await login('user', 'password');
      if (!success) {
        setLoginError('Login failed');
      }
    };

    const handleInvalidLogin = async () => {
      // Simulate an invalid login attempt
      const success = await login('wrong', 'wrong');
      if (!success) {
        setLoginError('Login failed');
      }
    };

    return (
      <div>
        <span data-testid="isAuthenticated">{isAuthenticated.toString()}</span>
        {user && <span data-testid="username">{user.username}</span>}
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleInvalidLogin}>Invalid Login</button>
        <button onClick={logout}>Logout</button>
        {loginError && <span data-testid="loginError">{loginError}</span>}
      </div>
    );
  };

  it('should provide initial authentication state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    expect(screen.queryByTestId('username')).toBeNull();
  });

  it('should allow a user to log in successfully', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    });
    expect(screen.getByTestId('username')).toHaveTextContent('user');
  });

  it('should not log in with invalid credentials', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Invalid Login' }));

    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    });
    expect(screen.queryByTestId('username')).toBeNull();
    expect(await screen.findByTestId('loginError')).toHaveTextContent('Login failed');
  });

  it('should allow a user to log out', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
    });

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    });
    expect(screen.queryByTestId('username')).toBeNull();
  });
});


