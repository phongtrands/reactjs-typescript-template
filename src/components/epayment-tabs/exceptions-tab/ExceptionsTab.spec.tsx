import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import ExceptionsTab from './ExceptionsTab';

import {
  accountsMockData,
  banksMockData,
  exceptionHostFileMockData,
  exceptionMT940MockData,
  hostFileMockData,
  mt940MockData,
} from '~/configs/mockData';
import { useAppSelector } from '~/redux/hook';
import { addIdToArray } from '~/utils';
import { exportCSVFile, getExceptionHostFileTable, getExceptionMT940Table } from '~/services';

jest.mock('~/services', () => ({
  exportCSVFile: jest.fn(),
  getExceptionMT940Table: jest.fn(),
  getExceptionHostFileTable: jest.fn(),
}));

const renderComponent = () => render(<ExceptionsTab />);

describe('ExceptionsTab Component', () => {
  let mockDispatch: jest.Mock;
  const mockExceptionsTabData = {
    epayment: {
      typeFile: 'mt940',
      tab: 'exception',
      selectedFile: mt940MockData[0].fileName,
      matching: { file: '' },
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
      exceptions: {
        file: mt940MockData[0].fileName,
        accountNo: '0039007442',
        bank: 'DBS',
        exceptionMT940: addIdToArray(exceptionMT940MockData),
        exceptionHostFile: addIdToArray(exceptionHostFileMockData),
      },
    },
  };
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(mockExceptionsTabData));
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    cleanup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Render ExceptionsTab Component MT940', async () => {
    renderComponent();
    const ePaymentTable = await screen.findByText('MT940');
    expect(ePaymentTable).toBeInTheDocument();
  });

  test('Render ExceptionsTab Component HostFile', async () => {
    const mockData = {
      ...mockExceptionsTabData,
      epayment: {
        ...mockExceptionsTabData.epayment,
        typeFile: 'hostFile',
      },
    };
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(mockData));
    renderComponent();
    const ePaymentTable = await screen.findByText('HostFile');
    expect(ePaymentTable).toBeInTheDocument();
  });

  test('Test download Report (MT940) File', async () => {
    (exportCSVFile as jest.Mock).mockResolvedValue('test.csv');
    renderComponent();
    const downloadBtn = await screen.findByText('Download Report');
    fireEvent.click(downloadBtn);
    expect(exportCSVFile).toHaveBeenCalledWith(
      'EXCEPTION_MT940_FILE',
      mockExceptionsTabData.epayment.exceptions.accountNo,
      mockExceptionsTabData.epayment.exceptions.file,
    );
  });

  test('Test Back Button', async () => {
    renderComponent();
    const backBtn = await screen.findByText('Back');
    fireEvent.click(backBtn);
    expect(mockDispatch.mock.calls[0][0].payload).toBe('summary');
  });

  test('Render ExceptionsTab Component after select new file', async () => {
    const mockData = {
      ...mockExceptionsTabData,
      epayment: {
        ...mockExceptionsTabData.epayment,
        selectedFile: mt940MockData[1].fileName,
      },
    };
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: any) => selectorFn(mockData));
    (getExceptionMT940Table as jest.Mock).mockResolvedValue('ExceptionMT940Data');
    (getExceptionHostFileTable as jest.Mock).mockResolvedValue('ExceptionHostFileData');
    renderComponent();
    await waitFor(() => {
      expect(mockDispatch.mock.calls[0][0].payload.exceptionMT940).toBe('ExceptionMT940Data');
    });
  });
});
