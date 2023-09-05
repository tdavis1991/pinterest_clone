import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home Page - Rendering', () => {
  it('It should have home page text', () => {
    render(<Home/>);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  })

  it('It should have button with test Click Me', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  })
})