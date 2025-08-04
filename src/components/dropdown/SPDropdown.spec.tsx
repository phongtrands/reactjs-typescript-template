import { render, screen, fireEvent } from '@testing-library/react';

import SPDropdown from './SPDropdown';
import '@testing-library/jest-dom';

describe('SPDropdown Component', () => {
  const options = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
    { label: 'Option C', value: 'C' },
  ];

  it('renders label if provided', () => {
    render(<SPDropdown label='Test' options={options} value='A' onChange={jest.fn()} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders correct number of options', async () => {
    render(<SPDropdown label='Test' options={options} value='A' onChange={jest.fn()} />);
    const dropdown = await screen.findByRole('combobox');
    fireEvent.mouseDown(dropdown);
    expect(screen.getAllByRole('option')).toHaveLength(options.length);
  });

  it('shows the selected value', async () => {
    render(<SPDropdown label='Test' options={options} value='B' onChange={jest.fn()} />);
    const dropdown = await screen.findByRole('combobox');
    await fireEvent.mouseDown(dropdown);
    const option = await screen.getAllByRole('option')[0];
    await fireEvent.click(option);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('calls onChange when selecting a different option', async () => {
    const handleChange = jest.fn();
    render(<SPDropdown label='Test' options={options} value='A' onChange={handleChange} />);
    const dropdown = await screen.findByRole('combobox');
    await fireEvent.mouseDown(dropdown);
    fireEvent.click(screen.getByText('Option B'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toHaveProperty('target.value', 'B');
  });
});
