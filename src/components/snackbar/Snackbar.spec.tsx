import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import type { CustomContentProps } from 'notistack';

import Snackbar from './Snackbar';

describe('Snackbar Component', () => {
  const baseProps = {
    id: 'test-id',
    message: 'Test message',
    variant: 'success',
  } as unknown as CustomContentProps;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Render Snackbar Component', () => {
    render(<Snackbar {...baseProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});
