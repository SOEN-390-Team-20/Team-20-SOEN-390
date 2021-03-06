import React from 'react';
import { render, screen } from '@testing-library/react';
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

it("should have initial title 'Login'", async () => {
  render(<MockLogin />);
  const title = screen.getByText(/login/i);
  expect(title).toBeInTheDocument();
});
