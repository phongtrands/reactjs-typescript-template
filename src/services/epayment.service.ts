import { format } from 'date-fns';

import { API_URLS, DATE_FORMAT } from '~/constants';
import type {
  Accounts,
  Banks,
  EPayment,
  ExceptionsHostFile,
  ExceptionsMT940,
  ExportFileType,
  HostFile,
  MT940,
} from '~/types';
import { addIdToArray, api } from '~/utils';
import store from '~/redux/store';
import { openPopup } from '~/redux';
import { extractFileName, getFilePath } from '~/utils/epayment.util';

const today = new Date();

const showError = (error: string) => {
  const dispatch = store.dispatch;
  dispatch(
    openPopup({
      type: 'error',
      content: error,
      onOk: () => {},
    }),
  );
};

export const getSummaryData = async () => {
  const banks = await getBanks();
  const firstBank = banks[0];
  const bankName = firstBank?.bankName || '';

  const accounts = await getAccounts(bankName);
  const firstAccountNo = accounts[0]?.bankAccountNo || '';

  const [mt940Table, hostFileTable] = await Promise.all([
    getMT940Table(bankName, firstAccountNo),
    getHostFileTable(bankName, firstAccountNo),
  ]);

  const data = {
    search: {
      bankName,
      banks,
      accountNo: firstAccountNo,
      accounts,
      fromDate: today,
      toDate: today,
    },
    mt940Table,
    hostFileTable,
  };

  return data;
};

export const getMT940Table = async (
  bankName: string,
  accountNo: string,
  fromDate: Date = today,
  toDate: Date = today,
): Promise<MT940[]> => {
  try {
    const response = await api.get<MT940[]>(API_URLS.MT940, {
      bankName,
      bankAccountNo: accountNo,
      fromDate: format(fromDate, DATE_FORMAT),
      toDate: format(toDate, DATE_FORMAT),
    });
    return addIdToArray(response, 'mt940');
  } catch (error) {
    showError(String(error));
    return [];
  }
};

export const getHostFileTable = async (
  bankName: string,
  accountNo: string,
  fromDate: Date = today,
  toDate: Date = today,
): Promise<HostFile[]> => {
  try {
    const response = await api.get<HostFile[]>(API_URLS.HOST_FILES, {
      bankName: bankName,
      bankAccountNo: accountNo,
      fromDate: format(fromDate, DATE_FORMAT),
      toDate: format(toDate, DATE_FORMAT),
    });
    return addIdToArray(response, 'host_file');
  } catch (error) {
    showError(String(error));
    return [];
  }
};

export const getMatchingEpaymentTable = async (fileName: string, bankAccountNo: string): Promise<EPayment[]> => {
  try {
    const response = await api.get<EPayment[]>(API_URLS.MATCHING.EPAYMENTS, {
      fileName,
      bankAccountNo,
    });
    return addIdToArray(response, 'matching_ePayment');
  } catch (error) {
    showError(String(error));
    return [];
  }
};

export const getMatchingNonEpaymentTable = async (fileName: string, bankAccountNo: string): Promise<EPayment[]> => {
  try {
    const response = await api.get<EPayment[]>(API_URLS.MATCHING.NON_EPAYMENTS, {
      fileName,
      bankAccountNo,
    });
    return addIdToArray(response, 'matching_non_ePayment');
  } catch (error) {
    showError(String(error));
    return [];
  }
};

export const getExceptionMT940Table = async (fileName: string, bankAccountNo: string): Promise<ExceptionsMT940[]> => {
  try {
    const response = await api.get<ExceptionsMT940[]>(API_URLS.EXCEPTIONS.MT940, {
      fileName,
      bankAccountNo,
    });
    return addIdToArray(response, 'exception_mt940');
  } catch (error) {
    showError(String(error));
    return [];
  }
};

export const getExceptionHostFileTable = async (
  fileName: string,
  bankAccountNo: string,
): Promise<ExceptionsHostFile[]> => {
  try {
    const response = await api.get<ExceptionsHostFile[]>(API_URLS.EXCEPTIONS.HOST_FILES, {
      fileName,
      bankAccountNo,
    });
    return addIdToArray(response, 'exception_host_file');
  } catch (error) {
    showError(String(error));
    return [];
  }
};

export const getBanks = async (): Promise<Banks[]> => {
  try {
    const response = await api.get<Banks[]>(API_URLS.BANKS);
    return response;
  } catch (error) {
    showError(String(error));
    return [];
  }
};

export const getAccounts = async (bankName: string = ''): Promise<Accounts[]> => {
  try {
    const response = await api.get<Accounts[]>(API_URLS.ACCOUNTS, { bankName });
    return response;
  } catch (error) {
    showError(String(error));
    return [];
  }
};

export const exportCSVFile = async (exportReportType: string, bankAccountNo: string, fileName: string) => {
  try {
    const response: ExportFileType = await api.get<ExportFileType>(
      API_URLS.EXPORTS.CSV,
      {
        exportReportType,
        bankAccountNo,
        fileName,
      },
      {
        Accept: 'text/csv',
      },
      'blob',
    );

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    const exportFileName = extractFileName(response.header['content-disposition'], '.csv');
    link.download = exportFileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return blob;
  } catch (error) {
    showError(String(error));
    return null;
  }
};
const getControlId = async (bankName: string, bankAccountNo: string, fileName: string): Promise<string> => {
  try {
    const response = await api.get<string[]>(API_URLS.MATCHING.GET_CONTROL_ID, {
      bankName,
      bankAccountNo,
      fileName,
    });
    return response[0] || '';
  } catch (error) {
    showError(String(error));
    return '';
  }
};

export const exportSapfinFile = async (bankInfo: Banks, filename: string, accountNo: string, fileSapStatus: string) => {
  try {
    const controlId: string = await getControlId(bankInfo.bankName, accountNo, filename);
    const filePath: string = getFilePath(bankInfo, accountNo, filename, controlId, fileSapStatus);
    const response: ExportFileType = await api.get<ExportFileType>(
      API_URLS.EXPORTS.SAPFIN,
      {
        filePath,
      },
      {
        Accept: 'text/csv',
      },
      'blob',
    );

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    const exportFileName = extractFileName(response.header['content-disposition'], '.csv');
    link.download = exportFileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    return blob;
  } catch (error) {
    showError(String(error));
    return null;
  }
};

export const confirmFile = async (
  sapFromPath: string,
  sapToPath: string,
  bankAccountNo: string,
  fileName: string,
): Promise<string> => {
  try {
    const response: string = await api.post<string>(API_URLS.CONFIRMATIONS.SAPFIN, {
      sapFromPath,
      sapToPath,
      bankAccountNo,
      fileName,
    });
    return response;
  } catch (error) {
    showError(String(error));
    return '';
  }
};
