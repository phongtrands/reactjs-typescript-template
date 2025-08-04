import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import SPInformativeDialog from './SPInformativeDialog';

import { useAppSelector } from '~/redux/hook';

const renderComponent = () => render(<SPInformativeDialog />);

describe(' SPInformativeDialog', () => {
  let mockDispatch: jest.Mock;
  const mockFuncion = jest.fn();
  const mockPopupData = {
    popup: {
      open: true,
      content: '',
      onOk: mockFuncion,
      type: '',
      title: 'Test Popup',
    },
  };
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(mockPopupData));
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    cleanup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Render SPInformativeDialog Component', async () => {
    renderComponent();
    const ePaymentTable = await screen.findByText('Test Popup');
    expect(ePaymentTable).toBeInTheDocument();
  });

  test('Render SPInformativeDialog Error Component', async () => {
    const errorMockData = {
      popup: {
        ...mockPopupData.popup,
        type: 'error',
      },
    };
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(errorMockData));
    renderComponent();
    const ePaymentTable = await screen.findByText('Error');
    expect(ePaymentTable).toBeInTheDocument();
  });

  test('Click OK button', async () => {
    renderComponent();
    const okButton = await screen.findByText('OK');
    fireEvent.click(okButton);
    expect(mockFuncion).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'popup/closePopup' });
  });

  test('Click Cancel button', async () => {
    renderComponent();
    const cancelButton = await screen.findByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'popup/closePopup' });
  });
});
