import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders todo app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/todo application/i);
  expect(headerElement).toBeInTheDocument();
});
