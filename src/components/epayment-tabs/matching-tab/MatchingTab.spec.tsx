import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

import MatchingTab from './MatchingTab';

import {
  accountsMockData,
  banksMockData,
  EPaymentMockData,
  hostFileMockData,
  mt940MockData,
  nonEPaymentMockData,
} from '~/configs/mockData';
import { useAppSelector } from '~/redux/hook';
import { addIdToArray } from '~/utils';
import {
  confirmFile,
  exportCSVFile,
  exportSapfinFile,
  getMatchingEpaymentTable,
  getMatchingNonEpaymentTable,
} from '~/services';

jest.mock('~/services', () => ({
  exportCSVFile: jest.fn(),
  exportSapfinFile: jest.fn(),
  confirmFile: jest.fn(),
  getMatchingEpaymentTable: jest.fn(),
  getMatchingNonEpaymentTable: jest.fn(),
}));

jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

const renderComponent = () => render(<MatchingTab />);

describe('MatchingTab Component', () => {
  let mockDispatch: jest.Mock;
  let mockEnqueue: jest.Mock;
  const mockMatchingTabData = {
    epayment: {
      typeFile: 'mt940',
      tab: 'matching',
      selectedFile: mt940MockData[0].fileName,
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
      matching: {
        file: mt940MockData[0].fileName,
        accountNo: '0039007442',
        bank: 'DBS',
        matchingEPayment: addIdToArray(EPaymentMockData),
        matchingNonEPayment: addIdToArray(nonEPaymentMockData),
      },
    },
  };
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(mockMatchingTabData));
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    mockEnqueue = enqueueSnackbar as jest.Mock;
    cleanup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Render MatchingTab Component', async () => {
    renderComponent();
    const ePaymentTable = await screen.findByText('ePayment');
    expect(ePaymentTable).toBeInTheDocument();
  });

  test('Render MatchingTab Component after select new file', async () => {
    const mockData = {
      ...mockMatchingTabData,
      epayment: {
        ...mockMatchingTabData.epayment,
        selectedFile: mt940MockData[1].fileName,
      },
    };
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(mockData));
    (getMatchingEpaymentTable as jest.Mock).mockResolvedValue('EPaymentData');
    (getMatchingNonEpaymentTable as jest.Mock).mockResolvedValue('NonEPaymentData');
    renderComponent();
    await waitFor(() => {
      expect(mockDispatch.mock.calls[0][0].payload.matchingEPayment).toBe('EPaymentData');
    });
  });

  test('Test download Sapfin File', async () => {
    (exportSapfinFile as jest.Mock).mockResolvedValue('test.csv');
    renderComponent();
    const downloadSapfinBtn = await screen.findByText('Download SAPFIN');
    fireEvent.click(downloadSapfinBtn);
    expect(exportSapfinFile).toHaveBeenCalledWith(
      mockMatchingTabData.epayment.summary.search.banks[0],
      mockMatchingTabData.epayment.matching.file,
      mockMatchingTabData.epayment.matching.accountNo,
      mockMatchingTabData.epayment.summary.mt940Table[0].sapfinStatus,
    );
  });

  test('Test download Sapfin File with exportSapfinFile return null', async () => {
    (exportSapfinFile as jest.Mock).mockResolvedValue(null);
    renderComponent();
    const downloadSapfinBtn = await screen.findByText('Download SAPFIN');
    fireEvent.click(downloadSapfinBtn);
    expect(mockEnqueue).not.toHaveBeenCalled();
  });

  test('Test download Sapfin File with bankName does not exist ', async () => {
    const newmockData = {
      epayment: {
        ...mockMatchingTabData.epayment,
        matching: {
          ...mockMatchingTabData.epayment.matching,
          bank: '',
        },
      },
    };
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(newmockData));
    renderComponent();
    const downloadSapfinBtn = await screen.findByText('Download SAPFIN');
    fireEvent.click(downloadSapfinBtn);
    expect(enqueueSnackbar).toHaveBeenCalledWith('Bank information not found.', { variant: 'error' });
  });

  test('Test download Report (MT940) File', async () => {
    (exportCSVFile as jest.Mock).mockResolvedValue('test.csv');
    renderComponent();
    const downloadMT940Btn = await screen.findByText('Download Report (MT940)');
    fireEvent.click(downloadMT940Btn);
    expect(exportCSVFile).toHaveBeenCalledWith(
      'MATCHING_MT940_FILE',
      mockMatchingTabData.epayment.matching.accountNo,
      mockMatchingTabData.epayment.matching.file,
    );
  });

  test('Test download Report (MT940) File with exportCSVFile return null', async () => {
    (exportCSVFile as jest.Mock).mockResolvedValue(null);
    renderComponent();
    const downloadMT940Btn = await screen.findByText('Download Report (MT940)');
    fireEvent.click(downloadMT940Btn);
    expect(mockEnqueue).not.toHaveBeenCalled();
  });

  test('Test Download Report (Host) File', async () => {
    (exportCSVFile as jest.Mock).mockResolvedValue('test.csv');
    renderComponent();
    const downloadHostBtn = await screen.findByText('Download Report (Host)');
    fireEvent.click(downloadHostBtn);
    expect(exportCSVFile).toHaveBeenCalledWith(
      'MATCHING_HOST_FILE',
      mockMatchingTabData.epayment.matching.accountNo,
      mockMatchingTabData.epayment.matching.file,
    );
  });

  test('Test Back Button', async () => {
    renderComponent();
    const backBtn = await screen.findByText('Back');
    fireEvent.click(backBtn);
    expect(mockDispatch.mock.calls[0][0].payload).toBe('summary');
  });

  test('Test Confirm Button', async () => {
    (confirmFile as jest.Mock).mockResolvedValue('test.csv');
    renderComponent();
    const confirmBtn = await screen.findByText('Confirm');
    fireEvent.click(confirmBtn);
    const onOk = mockDispatch.mock.calls[0][0].payload.onOk;
    onOk();
    expect(confirmFile).toHaveBeenCalled();
  });

  test('Test Confirm Button with confirmFile return null', async () => {
    (confirmFile as jest.Mock).mockResolvedValue(null);
    renderComponent();
    const confirmBtn = await screen.findByText('Confirm');
    fireEvent.click(confirmBtn);
    const onOk = mockDispatch.mock.calls[0][0].payload.onOk;
    onOk();
    expect(mockEnqueue).not.toHaveBeenCalled();
  });
});
