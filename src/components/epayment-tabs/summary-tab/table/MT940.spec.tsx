import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import Mt940 from './MT940';

import { accountsMockData, banksMockData, hostFileMockData, mt940MockData } from '~/configs/mockData';
import { useAppSelector } from '~/redux/hook';
import { addIdToArray } from '~/utils';

const renderComponent = () => render(<Mt940 />);

describe('MT940 Table Component', () => {
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

  test('Render MT940 Component', async () => {
    renderComponent();
    const tabBtn = await screen.findByText('MT940 File Name');
    expect(tabBtn).toBeInTheDocument();
  });
});
