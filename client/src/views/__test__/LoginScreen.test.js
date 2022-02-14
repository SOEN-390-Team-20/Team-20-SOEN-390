/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
import LoginScreen from '../LoginScreen';

function MockLogin() {
  return (
    <BrowserRouter>
      <LoginScreen />
    </BrowserRouter>
  );
}

it("should have initial title 'Signup'", async () => {
  render(<MockLogin />);
  const title = screen.getByText(/signup/i);
  expect(title).toBeInTheDocument();
});

it("should have changed title 'Login'", async () => {
  render(<MockLogin />);
  const submitButton = screen.getByText(/sign up|log in/i);
  fireEvent.click(submitButton);
  const title = screen.getByText(/login/i);
  expect(title).toBeInTheDocument();
});
