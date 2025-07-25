import { format } from 'date-fns';

import { API_URLS } from '~/constants';
import type {
  Accounts,
  Banks,
  EPayment,
  ExceptionsHostFile,
  ExceptionsMT940,
  ExportCSVFileType,
  HostFile,
  MT940,
} from '~/types';
import { addIdToArray, api } from '~/utils';
import store from '~/redux/store';
import { openPopup } from '~/redux';

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
  const firstAccountNo = accounts[0]?.bankacct || '';

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
      fromDate: format(fromDate, 'yyyy-MM-dd'),
      toDate: format(toDate, 'yyyy-MM-dd'),
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
      fromDate: format(fromDate, 'yyyy-MM-dd'),
      toDate: format(toDate, 'yyyy-MM-dd'),
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
    const response: ExportCSVFileType = await api.get<ExportCSVFileType>(
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

    console.log('Export CSV File Response:', response.header);

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    // Need get fileName from response header
    const csvFileName = fileName.replace(/\.txt$/i, '.csv');
    link.download = `${exportReportType}_${csvFileName}`;
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

export const confirmFile = async () => {
  try {
    const response = await api.post<[]>(API_URLS.CONFIRMATIONS.SAPFIN, {
      sap_file_name: 'DBS_0039007442_20230617',
      sap_from_path: '/apps/pentaho_data/sap-portal/temp/DBS/',
      sap_to_path: '/apps/pentaho_data/sap-portal/output-csv/DBS/0039007442/',
      sap_to_path_xml: '/apps/pentaho_data/sap-portal/output-xml/DBS/0039007442/',
      param_account: '0039007442',
      param_file: 'SINPOO01XXXX.CASP_MT940.D230617104353.txt',
    });
    return response;
  } catch (error) {
    showError(String(error));
    return [];
  }
};
