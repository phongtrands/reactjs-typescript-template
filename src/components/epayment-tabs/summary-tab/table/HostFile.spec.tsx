import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

import HostFile from './HostFile';

import { accountsMockData, banksMockData, hostFileMockData, mt940MockData } from '~/configs/mockData';
import { useAppSelector } from '~/redux/hook';
import { addIdToArray } from '~/utils';
import { exportCSVFile } from '~/services';

jest.mock('~/services', () => ({
  exportCSVFile: jest.fn(),
}));

jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

const renderComponent = () => render(<HostFile />);

describe('MT940 Table Component', () => {
  let mockDispatch: jest.Mock;
  let mockEnqueue: jest.Mock;
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
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    mockEnqueue = enqueueSnackbar as jest.Mock;
    cleanup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Render HostFile Component', async () => {
    renderComponent();
    const hostFileTable = await screen.findByText('Host File Name');
    expect(hostFileTable).toBeInTheDocument();
  });

  test('Test click action navigation exception tab', async () => {
    renderComponent();
    const matchingAction = await screen.findByTestId('warning_icon_item_1');
    fireEvent.click(matchingAction);
    expect(mockDispatch.mock.calls[1][0].payload).toBe('exception');
  });

  test('Test click action download file', async () => {
    (exportCSVFile as jest.Mock).mockResolvedValue('test.csv');
    renderComponent();
    const downloadBtn = await screen.findByTestId('download_item_1');
    fireEvent.click(downloadBtn);
    expect(exportCSVFile).toHaveBeenCalledWith(
      'HOST_FILE',
      mockSummaryTabData.epayment.summary.search.accountNo,
      mockSummaryTabData.epayment.summary.hostFileTable[0].fileName,
    );
  });

  test('Test click action download file with exportCSVFile return null', async () => {
    (exportCSVFile as jest.Mock).mockResolvedValue(null);
    renderComponent();
    const downloadBtn = await screen.findByTestId('download_item_1');
    fireEvent.click(downloadBtn);
    expect(mockEnqueue).not.toHaveBeenCalled();
  });
});
