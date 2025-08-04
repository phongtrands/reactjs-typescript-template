import { render, screen } from '@testing-library/react';
import type { ButtonProps } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';

import { Button } from '..';

describe('SPButton Component', () => {
  const baseProps: ButtonProps = {
    variant: 'outlined',
    color: 'inherit',
    startIcon: <SaveAltOutlinedIcon />,
    onClick: () => {},
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Render SPButton Component', () => {
    render(<Button {...baseProps}>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
});
