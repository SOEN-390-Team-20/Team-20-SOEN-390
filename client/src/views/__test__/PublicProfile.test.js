import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { toBeInTheDocument } from '@testing-library/jest-dom';
import PublicProfile from '../PublicProfile';

function MockLogin() {
  return (
    <BrowserRouter>
      <PublicProfile />
    </BrowserRouter>
  );
}

it('should render public profile', async () => {
  render(<MockLogin />);
  const userId = screen.getByText(/public/i);
  expect(userId).toBeInTheDocument();
});
