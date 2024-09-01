/* eslint-disable no-undef */
// __tests__/SignInForm.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInForm from '../SignInForm'; // Adjust the path as needed

describe('SignInForm', () => {
  it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
    // Create a mock onSubmit function
    const mockOnSubmit = jest.fn();

    // Render the SignInForm component
    const { getByPlaceholderText, getByText } = render(
      <SignInForm onSubmit={mockOnSubmit} loading={false} error={null} />
    );

    // Fill in the form fields
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    // Simulate form submission
    fireEvent.press(getByText('Sign In'));

    // Wait for async onSubmit to complete
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith({
        Username: 'testuser',
        password: 'password123',
      });
    });
  });
});
