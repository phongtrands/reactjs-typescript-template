import { useMsal } from '@azure/msal-react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import EPaymentPage from '~/pages/EPaymentPage';
import { changeTab } from '~/redux';
import { useAppSelector } from '~/redux/hook';

const renderComponent = () => render(<EPaymentPage />);

describe('LoginPage Component', () => {
  const mockSummaryTabData = {
    epayment: {
      typeFile: 'mt940',
      tab: 'summary',
      matching: { file: 'SINPOO01XXXX.CASP_MT940.D220414042430.txt' },
      exceptions: { file: 'SINPOO01XXXX.CASP_MT940.D220414042430.txt' },
      summary: {
        search: {
          bankName: '',
          banks: [],
          accountNo: '',
          accounts: [],
          fromDate: new Date(),
          toDate: new Date(),
        },
        mt940Table: [],
        hostFileTable: [],
      },
    },
  };
  beforeEach(() => {
    const mockInstance = {
      loginPopup: jest.fn().mockResolvedValue({
        accessToken: 'mock-access-token',
        account: { username: 'testuser' },
      }),
    };
    (useMsal as jest.Mock).mockReturnValue({
      instance: mockInstance,
    });
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(mockSummaryTabData));
    cleanup();
  });

  test('Render EPaymentPage Component', async () => {
    renderComponent();
    const tabBtn = await screen.findByTestId('tab-summary');
    expect(tabBtn).toBeInTheDocument();
  });

  test('Change Matching Tab', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    renderComponent();
    const tabBtn = await screen.findByTestId('tab-matching');
    fireEvent.click(tabBtn);
    expect(mockDispatch).toHaveBeenCalledWith(changeTab('matching'));
  });
});
