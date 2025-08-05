import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import SummaryTab from '~/components/epayment-tabs/summary-tab/SummaryTab';
import { accountsMockData, banksMockData, hostFileMockData, mt940MockData } from '~/configs/mockData';
import { changeTypeFile } from '~/redux';
import { useAppSelector } from '~/redux/hook';
import { addIdToArray } from '~/utils';

const renderComponent = () => render(<SummaryTab />);

describe('SummaryTab Component', () => {
  const mockSummaryTabData = {
    epayment: {
      typeFile: 'mt940',
      tab: 'summary',
      matching: { file: '' },
      exceptions: { file: '' },
      summary: {
        search: {
          bankName: 'DBS',
          banks: banksMockData,
          accountNo: '0039007442',
          accounts: accountsMockData,
          fromDate: new Date(),
          toDate: new Date(),
        },
        mt940Table: addIdToArray(mt940MockData),
        hostFileTable: addIdToArray(hostFileMockData),
      },
    },
  };
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(mockSummaryTabData));
    cleanup();
  });

  test('Render SummaryTab Component with mt940', async () => {
    renderComponent();
    const tabBtn = await screen.findByTestId('tab-mt940');
    expect(tabBtn).toBeInTheDocument();
  });

  test('Render SummaryTab Component with typeFile null', async () => {
    const newMockData = {
      epayment: {
        ...mockSummaryTabData.epayment,
        typeFile: null,
      },
    };
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(newMockData));
    renderComponent();
    const tabBtn = await screen.findByTestId('tab-mt940');
    expect(tabBtn).toBeInTheDocument();
  });

  test('Change Hostfile', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    renderComponent();
    const tabBtn = await screen.findByTestId('tab-hostFile');
    fireEvent.click(tabBtn);
    expect(mockDispatch).toHaveBeenCalledWith(changeTypeFile('hostFile'));
  });
});
