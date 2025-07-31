import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';

import Search from '~/components/epayment-tabs/summary-tab/search/Search';
import { accountsMockData, banksMockData, hostFileMockData, mt940MockData } from '~/configs/mockData';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { getAccounts, getHostFileTable, getMT940Table } from '~/services';
import { addIdToArray } from '~/utils';

const renderComponent = () => render(<Search />);

jest.mock('~/services', () => ({
  getMT940Table: jest.fn(),
  getHostFileTable: jest.fn(),
  getAccounts: jest.fn(),
}));

jest.mock('~/redux/hook', () => ({
  ...jest.requireActual('~/redux/hook'),
  useAppDispatch: jest.fn(),
}));

describe('Search Component', () => {
  const mockDispatch = jest.fn();
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
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
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Render Search Component', async () => {
    renderComponent();
    const searchBtn = await screen.findByText('Search');
    expect(searchBtn).toBeInTheDocument();
  });

  test('Test search function', async () => {
    (getMT940Table as jest.Mock).mockResolvedValue(mockSummaryTabData.epayment.summary.mt940Table);
    (getHostFileTable as jest.Mock).mockResolvedValue(addIdToArray(mockSummaryTabData.epayment.summary.hostFileTable));
    renderComponent();
    const searchBtn = await screen.findByText('Search');
    fireEvent.click(searchBtn);
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  test('Test change Bank dropdown function', async () => {
    (getAccounts as jest.Mock).mockResolvedValue([
      {
        bankacct: '123456789',
      },
    ]);
    renderComponent();
    const dropdowns = await screen.findAllByRole('combobox');
    const bankDropdown = dropdowns[0];
    fireEvent.mouseDown(bankDropdown);
    const option = await screen.findByText('OCBC');
    await fireEvent.click(option);
    expect(mockDispatch.mock.calls[0][0].payload.accountNo).toBe('123456789');
  });

  test('Test change Account No dropdown function', async () => {
    renderComponent();
    const dropdowns = await screen.findAllByRole('combobox');
    const bankDropdown = dropdowns[1];
    fireEvent.mouseDown(bankDropdown);
    const option = await screen.findByText('0720041291');
    await fireEvent.click(option);
    expect(mockDispatch.mock.calls[0][0].payload.accountNo).toBe('0720041291');
  });
});
