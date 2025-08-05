import '@testing-library/jest-dom';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import {
  addYears,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';
import { enqueueSnackbar } from 'notistack';

import SPCalendar from './SPCalendar';

import type { CalendarProps } from '~/types';

jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

const renderComponent = (props: CalendarProps) => render(<SPCalendar {...props} />);

describe(' SPCalendar Component', () => {
  const mockFuncion = jest.fn();
  let mockEnqueue: jest.Mock;
  const today = new Date();
  const mockProp = {
    label: 'Bank Statement Date',
    defaultFromDate: today,
    defaultToDate: today,
    onChange: mockFuncion,
  };
  beforeEach(() => {
    mockEnqueue = enqueueSnackbar as jest.Mock;
    cleanup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Render SPCalendar Component', async () => {
    renderComponent(mockProp);
    const ePaymentTable = await screen.findByText('Bank Statement Date');
    expect(ePaymentTable).toBeInTheDocument();
  });

  test('Test change value with option Today', async () => {
    renderComponent(mockProp);
    const input = await screen.findAllByTestId('sp-calendar-input');
    fireEvent.click(input[0]);
    const dayOption = await screen.findByText('Today');
    fireEvent.click(dayOption);
    expect(format(mockFuncion.mock.calls[0][0], 'dd/MM/yyyy')).toBe(format(today, 'dd/MM/yyyy'));
  });

  test('Test change value with option Last 7 days', async () => {
    renderComponent(mockProp);
    const input = await screen.findAllByTestId('sp-calendar-input');
    fireEvent.click(input[0]);
    const dayOption = await screen.findByText('Last 7 days');
    fireEvent.click(dayOption);
    expect(format(mockFuncion.mock.calls[0][0], 'dd/MM/yyyy')).toBe(format(subDays(today, 7), 'dd/MM/yyyy'));
  });

  test('Test change value with option Month to date', async () => {
    renderComponent(mockProp);
    const input = await screen.findAllByTestId('sp-calendar-input');
    fireEvent.click(input[0]);
    const dayOption = await screen.findByText('Month to date');
    fireEvent.click(dayOption);
    expect(format(mockFuncion.mock.calls[0][0], 'dd/MM/yyyy')).toBe(format(startOfMonth(today), 'dd/MM/yyyy'));
  });

  test('Test change value with option Year to date', async () => {
    renderComponent(mockProp);
    const input = await screen.findAllByTestId('sp-calendar-input');
    fireEvent.click(input[0]);
    const dayOption = await screen.findByText('Year to date');
    fireEvent.click(dayOption);
    expect(format(mockFuncion.mock.calls[0][0], 'dd/MM/yyyy')).toBe(format(startOfYear(today), 'dd/MM/yyyy'));
  });

  test('Test change value with option The previous Month', async () => {
    renderComponent(mockProp);
    const input = await screen.findAllByTestId('sp-calendar-input');
    fireEvent.click(input[0]);
    const dayOption = await screen.findByText('The previous Month');
    fireEvent.click(dayOption);
    expect(format(mockFuncion.mock.calls[0][0], 'dd/MM/yyyy')).toBe(
      format(startOfMonth(subMonths(today, 1)), 'dd/MM/yyyy'),
    );
    expect(format(mockFuncion.mock.calls[0][1], 'dd/MM/yyyy')).toBe(
      format(endOfMonth(subMonths(today, 1)), 'dd/MM/yyyy'),
    );
  });

  test('Test change value with option Specific Date', async () => {
    renderComponent(mockProp);
    const input = await screen.findAllByTestId('sp-calendar-input');
    fireEvent.click(input[0]);
    const dayOption = await screen.findByText('Specific Date');
    fireEvent.click(dayOption);
    const day = await screen.findByRole('gridcell', { name: '15' });
    fireEvent.click(day);
    const doneBtn = await screen.findByText('Done');
    fireEvent.click(doneBtn);
    expect(format(mockFuncion.mock.calls[0][0], 'dd/MM/yyyy')).toBe(format(setDate(today, 15), 'dd/MM/yyyy'));
    expect(format(mockFuncion.mock.calls[0][1], 'dd/MM/yyyy')).toBe(format(setDate(today, 15), 'dd/MM/yyyy'));
  });

  test('Test change value with option All Dates Before', async () => {
    renderComponent(mockProp);
    const input = await screen.findAllByTestId('sp-calendar-input');
    fireEvent.click(input[0]);
    const dayOption = await screen.findByText('All Dates Before');
    fireEvent.click(dayOption);
    const day = await screen.findByRole('gridcell', { name: '15' });
    fireEvent.click(day);
    const doneBtn = await screen.findByText('Done');
    fireEvent.click(doneBtn);
    expect(format(mockFuncion.mock.calls[0][0], 'dd/MM/yyyy')).toBe(
      format(subYears(setDate(today, 15), 1), 'dd/MM/yyyy'),
    );
    expect(format(mockFuncion.mock.calls[0][1], 'dd/MM/yyyy')).toBe(format(setDate(today, 15), 'dd/MM/yyyy'));
  });

  test('Test change value with option All Dates After', async () => {
    renderComponent(mockProp);
    const input = await screen.findAllByTestId('sp-calendar-input');
    fireEvent.click(input[0]);
    const dayOption = await screen.findByText('All Dates After');
    fireEvent.click(dayOption);
    const day = await screen.findByRole('gridcell', { name: '15' });
    fireEvent.click(day);
    const doneBtn = await screen.findByText('Done');
    fireEvent.click(doneBtn);
    expect(format(mockFuncion.mock.calls[0][0], 'dd/MM/yyyy')).toBe(format(setDate(today, 15), 'dd/MM/yyyy'));
    expect(format(mockFuncion.mock.calls[0][1], 'dd/MM/yyyy')).toBe(
      format(addYears(setDate(today, 15), 1), 'dd/MM/yyyy'),
    );
  });

  test('Test change value with option Date Range', async () => {
    renderComponent(mockProp);
    const input = await screen.findAllByTestId('sp-calendar-input');
    fireEvent.click(input[0]);
    const dayOption = await screen.findByText('Date Range');
    fireEvent.click(dayOption);
    const startDate = await screen.getAllByRole('gridcell', { name: '1' });
    fireEvent.click(startDate[0]);
    const endDate = await screen.getAllByRole('gridcell', { name: '26' });
    fireEvent.click(endDate[1]);
    const doneBtn = await screen.findByText('Done');
    fireEvent.click(doneBtn);
    expect(format(mockFuncion.mock.calls[0][0], 'dd/MM/yyyy')).toBe(format(startOfMonth(today), 'dd/MM/yyyy'));
    expect(format(mockFuncion.mock.calls[0][1], 'dd/MM/yyyy')).toBe(format(setDate(today, 26), 'dd/MM/yyyy'));
  });

  test('Test change value manual with date 2025-08-01', async () => {
    renderComponent(mockProp);
    const input = await screen.findByTestId('sp-calendar-input');
    await act(async () => {
      input.focus();
      fireEvent.change(input, { target: { value: '2025-08-01' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(format(mockFuncion.mock.calls[0][0], 'dd/MM/yyyy')).toBe('01/08/2025');
  });

  test('Test change value manual with date Invalid format 2025-08', async () => {
    renderComponent(mockProp);
    const input = await screen.findByTestId('sp-calendar-input');
    await act(async () => {
      input.focus();
      fireEvent.change(input, { target: { value: '2025-08' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Invalid format. Correct: YYYY-MM-DD / YYYY-MM-DD or YYYY-MM-DD');
  });

  test('Test change value manual with date Invalid format 2024 / 2025-08-01', async () => {
    renderComponent(mockProp);
    const input = await screen.findByTestId('sp-calendar-input');
    await act(async () => {
      input.focus();
      fireEvent.change(input, { target: { value: '2024 / 2025-08-01' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Invalid format. Correct: YYYY-MM-DD / YYYY-MM-DD or YYYY-MM-DD');
  });

  test('Test change value manual with date Invalid format 2024-08-01 / 2025-08-34', async () => {
    renderComponent(mockProp);
    const input = await screen.findByTestId('sp-calendar-input');
    await act(async () => {
      input.focus();
      fireEvent.change(input, { target: { value: '2024-08-01 / 2025-08-34' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Invalid date');
  });

  test('Test change value manual with date Invalid format 2024-08-01 / 2225-08-01', async () => {
    renderComponent(mockProp);
    const input = await screen.findByTestId('sp-calendar-input');
    await act(async () => {
      input.focus();
      fireEvent.change(input, { target: { value: '2024-08-01 / 2225-08-01' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Invalid year only accepts 1900 - 2100');
  });

  test('Test change value manual with date Invalid format 2025-08-01 / 2024-08-01', async () => {
    renderComponent(mockProp);
    const input = await screen.findByTestId('sp-calendar-input');
    await act(async () => {
      input.focus();
      fireEvent.change(input, { target: { value: '2025-08-01 / 2024-08-01' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    });
    expect(mockEnqueue.mock.calls[0][0]).toBe('Start date must be before or equal to end date');
  });

  test('Test Cancel Button', async () => {
    renderComponent(mockProp);
    const input = await screen.findAllByTestId('sp-calendar-input');
    fireEvent.click(input[0]);
    const dayOption = await screen.findByText('All Dates After');
    fireEvent.click(dayOption);
    const day = await screen.findByRole('gridcell', { name: '15' });
    fireEvent.click(day);
    const cancleBtn = await screen.findByText('Cancel');
    fireEvent.click(cancleBtn);
    await act(async () => {
      expect(day).not.toBeInTheDocument();
    });
  });
});
