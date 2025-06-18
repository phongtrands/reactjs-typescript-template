import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../src/components/Header';

describe('Header component', () => {
  it('renders correctly', () => {
    console.log('Testing Header component rendering');
    render(<Header />);
    expect(screen.getByText('Finance Interface')).toBeInTheDocument();
  });
});
