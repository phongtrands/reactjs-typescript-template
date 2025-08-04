import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, Button, TableCell } from '@mui/material';

import theme from './theme';

describe('MUI Custom Theme', () => {
  const renderWithTheme = (ui: React.ReactNode) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

  it('applies custom button styles', () => {
    renderWithTheme(<Button>Test Button</Button>);

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveStyle({
      backgroundColor: '#055f8e',
      color: '#fff',
      fontWeight: '600',
    });
  });

  it('applies custom table cell styles', () => {
    renderWithTheme(
      <table>
        <tbody>
          <tr>
            <TableCell>Cell Text</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByText('Cell Text');
    expect(cell).toHaveStyle({
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      border: '1px solid #ddd',
    });
  });

  it('applies typography font family', () => {
    renderWithTheme(<Button>Font Test</Button>);
    const button = screen.getByRole('button', { name: /font test/i });
    expect(button).toHaveStyle({
      fontFamily: 'Inter, "Segoe UI", sans-serif',
    });
  });
});
