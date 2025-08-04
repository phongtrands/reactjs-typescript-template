import { render, screen } from '@testing-library/react';
import type { TextareaAutosizeProps } from '@mui/material';

import SPTextArea from './SPTextArea';

describe('Snackbar Component', () => {
  const baseProps: TextareaAutosizeProps = {
    value: 'Test message',
    minRows: 6,
    maxRows: 6,
    placeholder: 'Maximum 4 rows',
    style: { width: '100%', resize: 'none' },
    disabled: true,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Render SPTextArea Component', () => {
    render(<SPTextArea {...baseProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});
