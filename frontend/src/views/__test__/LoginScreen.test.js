import { fireEvent, render, screen } from "@testing-library/react";
import { LoginScreen } from "../LoginScreen";
import { BrowserRouter } from 'react-router-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom'

const MockLogin = () => {
    return (
        <BrowserRouter>
            <LoginScreen />
        </BrowserRouter>
    )
}

it("should have initial title 'Signup'", async () => {
  render(<MockLogin />);
  const title = screen.getByText(/signup/i);
  expect(title).toBeInTheDocument();
});

it("should have changed title 'Login'", async () => {
    render(<MockLogin />);
    const submitButton = screen.getByText(/sign up|log in/i)
    fireEvent.click(submitButton)
    const title = screen.getByText(/login/i);
    expect(title).toBeInTheDocument();
  });
