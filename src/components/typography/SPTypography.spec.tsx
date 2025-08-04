import { render, screen } from '@testing-library/react';

import SPTypography from './SPTypography';

describe('SPTypography Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Render SPTypography Component', () => {
    render(<SPTypography>Test Message</SPTypography>);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });
});
