import { format } from 'date-fns';

import {
  getSummaryData,
  getMT940Table,
  getHostFileTable,
  getMatchingEpaymentTable,
  getMatchingNonEpaymentTable,
  getExceptionMT940Table,
  getExceptionHostFileTable,
  getBanks,
  getAccounts,
  exportCSVFile,
  exportSapfinFile,
  confirmFile,
} from './epayment.service'; // đổi đường dẫn cho đúng

import { addIdToArray, api } from '~/utils';
import store from '~/redux/store';
import { extractFileName, getFilePath } from '~/utils/epayment.util';
import {
  accountsMockData,
  banksMockData,
  EPaymentMockData,
  exceptionHostFileMockData,
  exceptionMT940MockData,
  hostFileMockData,
  mt940MockData,
  nonEPaymentMockData,
} from '~/configs/mockData';

jest.mock('date-fns/format', () => ({
  format: jest.fn(() => '2025-07-29'),
}));

jest.mock('~/utils', () => ({
  api: { get: jest.fn(), post: jest.fn() },
  addIdToArray: jest.fn((arr) => arr.map((item: any, i: number) => ({ ...item, id: i + 1 }))),
}));

jest.mock('~/redux/store', () => ({
  __esModule: true,
  default: {
    dispatch: jest.fn(),
  },
}));

jest.mock('~/redux', () => ({
  openPopup: jest.fn((args) => ({ type: 'MOCK_POPUP', ...args })),
}));

jest.mock('~/utils/epayment.util', () => ({
  extractFileName: jest.fn(() => 'export.csv'),
  getFilePath: jest.fn(() => '/mock/path/file.csv'),
}));

const mockApiGet = api.get as jest.Mock;
const mockApiPost = api.post as jest.Mock;
const mockDispatch = store.dispatch as jest.Mock;

describe('Epayment service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (window.URL.createObjectURL as any) = jest.fn(() => 'blob:mock-url');
    (window.URL.revokeObjectURL as any) = jest.fn();
    document.createElement = jest.fn().mockReturnValue({
      href: '',
      download: '',
      click: jest.fn(),
      remove: jest.fn(),
    });
    document.body.appendChild = jest.fn();
  });

  it('should fetch and return summary data', async () => {
    mockApiGet
      .mockResolvedValueOnce(banksMockData)
      .mockResolvedValueOnce(accountsMockData)
      .mockResolvedValueOnce(addIdToArray(mt940MockData))
      .mockResolvedValueOnce(addIdToArray(hostFileMockData));

    const result = await getSummaryData();
    expect(result.search.bankName).toBe('DBS');
    expect(result.mt940Table[0].fileName).toBe(mt940MockData[0].fileName);
  });

  it('should handle empty banks', async () => {
    mockApiGet.mockResolvedValueOnce([]).mockResolvedValueOnce([]).mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    const result = await getSummaryData();
    expect(result.search.bankName).toBe('');
    expect(result.mt940Table).toEqual([]);
  });

  it('should return mt940 table', async () => {
    mockApiGet.mockResolvedValueOnce(mt940MockData);
    const res = await getMT940Table('DBS', '123');
    expect(res[0].fileName).toBe(mt940MockData[0].fileName);
    expect(format).toHaveBeenCalled();
  });

  it('should handle error mt940 table', async () => {
    mockApiGet.mockRejectedValueOnce(new Error('API error'));
    const res = await getMT940Table('Bank', '123');
    expect(res).toEqual([]);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should return host file table', async () => {
    mockApiGet.mockResolvedValueOnce(hostFileMockData);
    const res = await getHostFileTable('Bank', '123');
    expect(res[0].fileName).toBe(hostFileMockData[0].fileName);
  });

  it('should handle error host file table', async () => {
    mockApiGet.mockRejectedValueOnce(new Error('error'));
    const res = await getHostFileTable('Bank', '123');
    expect(res).toEqual([]);
  });

  it('should return matching e-payment table', async () => {
    mockApiGet.mockResolvedValueOnce(EPaymentMockData);
    const res = await getMatchingEpaymentTable('file.txt', '123');
    expect(res[0].paymentMethod).toBe(EPaymentMockData[0].paymentMethod);
  });

  it('should handle error matching e-payment table', async () => {
    mockApiGet.mockRejectedValueOnce(new Error('error'));
    const res = await getMatchingEpaymentTable('file.txt', '123');
    expect(res).toEqual([]);
  });

  it('should return non e-payment table', async () => {
    mockApiGet.mockResolvedValueOnce(nonEPaymentMockData);
    const res = await getMatchingNonEpaymentTable('file.txt', '123');
    expect(res[0].paymentMethod).toBe(nonEPaymentMockData[0].paymentMethod);
  });

  it('should handle error non e-payment table', async () => {
    mockApiGet.mockResolvedValueOnce(new Error('error'));
    const res = await getMatchingNonEpaymentTable('file.txt', '123');
    expect(res).toEqual([]);
  });

  it('should return exception mt940 table', async () => {
    mockApiGet.mockResolvedValueOnce(exceptionMT940MockData);
    const res = await getExceptionMT940Table('file.txt', '123');
    expect(res[0].paymentMethod).toBe(exceptionMT940MockData[0].paymentMethod);
  });

  it('should handle error exception mt940 table', async () => {
    mockApiGet.mockResolvedValueOnce(new Error('error'));
    const res = await getExceptionMT940Table('file.txt', '123');
    expect(res).toEqual([]);
  });

  it('should return exception host file table', async () => {
    mockApiGet.mockResolvedValueOnce(exceptionHostFileMockData);
    const res = await getExceptionHostFileTable('file.txt', '123');
    expect(res[0].bankTransferId).toBe(exceptionHostFileMockData[0].bankTransferId);
  });

  it('should handle error exception host file table', async () => {
    mockApiGet.mockResolvedValueOnce(new Error('error'));
    const res = await getExceptionHostFileTable('file.txt', '123');
    expect(res).toEqual([]);
  });

  it('should return banks', async () => {
    mockApiGet.mockResolvedValueOnce(banksMockData);
    const res = await getBanks();
    expect(res[0].bankName).toBe(banksMockData[0].bankName);
  });

  it('should return accounts', async () => {
    mockApiGet.mockResolvedValueOnce(accountsMockData);
    const res = await getAccounts('BankX');
    expect(res[0].bankAccountNo).toBe(accountsMockData[0].bankAccountNo);
  });

  it('should export CSV and return blob', async () => {
    mockApiGet.mockResolvedValueOnce({ data: 'csvdata', header: { 'content-disposition': 'file.csv' } });
    const blob = await exportCSVFile('report', '123', 'file.txt');
    expect(blob).toBeInstanceOf(Blob);
    expect(extractFileName).toHaveBeenCalled();
  });

  it('should handle error export CSV', async () => {
    mockApiGet.mockRejectedValueOnce(new Error('error'));
    const blob = await exportCSVFile('report', '123', 'file.txt');
    expect(blob).toBeNull();
  });

  it('should export SAPFIN file', async () => {
    mockApiGet
      .mockResolvedValueOnce(['controlId123'])
      .mockResolvedValueOnce({ data: 'sapdata', header: { 'content-disposition': 'file.csv' } });

    const blob = await exportSapfinFile({ bankName: 'BankA' } as any, 'file.txt', '123', 'OK');
    expect(blob).toBeInstanceOf(Blob);
    expect(getFilePath).toHaveBeenCalled();
  });

  it('should handle error export SAPFIN file', async () => {
    mockApiGet.mockResolvedValueOnce(['controlId123']).mockResolvedValueOnce(new Error('error'));
    const blob = await exportSapfinFile({ bankName: 'BankA' } as any, 'file.txt', '123', 'OK');
    expect(blob).toBeNull();
  });

  it('should confirm file', async () => {
    mockApiPost.mockResolvedValueOnce(['CSV and XML files are submitted to SAPFIN']);
    const res = (await confirmFile(
      '/apps/pentaho_data/sap-portal/temp/DBS/',
      '/apps/pentaho_data/sap-portal/output-csv/DBS/0039007442/',
      '0039007442',
      'SINPOO01XXXX.CASP_MT940.D220419045527.txt',
    )) as unknown as Array<string>;
    expect(res[0]).toBe('CSV and XML files are submitted to SAPFIN');
  });

  it('should handle error confirm file', async () => {
    mockApiPost.mockRejectedValueOnce(new Error('error'));
    const res = await confirmFile(
      '/apps/pentaho_data/sap-portal/temp/DBS/',
      '/apps/pentaho_data/sap-portal/output-csv/DBS/0039007442/',
      '0039007442',
      'SINPOO01XXXX.CASP_MT940.D220419045527.txt',
    );
    expect(res).toEqual('');
  });
});
