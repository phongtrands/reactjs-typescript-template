import { format } from 'date-fns';

import {
  accountsMockData,
  banksMockData,
  EPaymentMockData,
  exceptionHostFileMockData,
  exceptionMT940MockData,
  hostFileMockData,
  mt940MockData,
  nonEPaymentMockData,
} from './../configs/mockData';

import { API_URLS } from '~/constants';
import type { Accounts, Banks, EPayment, ExceptionsHostFile, ExceptionsMT940, HostFile, MT940 } from '~/types';
import { addIdToArray, api } from '~/utils';

const today = new Date();

export const getSummaryData = async () => {
  const banks = await getBanks();
  const accounts = await getAccounts(banks[0].bankName);
  const mt940Table = await getMT940Table(banks[0].bankName);
  const hostFileTable = await getHostFileTable(banks[0].bankName);
  const data = {
    search: {
      bankName: banks[0]?.bankName || '',
      banks: banks,
      accountNo: accounts[0]?.bankacct || '',
      accounts: accounts,
      fromDate: today,
      toDate: today,
    },
    mt940Table: mt940Table,
    hostFileTable: hostFileTable,
  };
  return data;
};

export const getMT940Table = async (
  bankName: string = '',
  accountno: string = '',
  fromDate: Date = today,
  toDate: Date = today,
): Promise<MT940[]> => {
  try {
    const response: MT940[] = await api.get<MT940[]>(API_URLS.MT940, {
      bank_name: bankName,
      bankacct: accountno,
      from_date: format(fromDate, 'yyyy-MM-dd'),
      to_date: format(toDate, 'yyyy-MM-dd'),
    });
    return addIdToArray(response, 'mt940');
  } catch (error) {
    if (!accountno) {
      console.error(error);
      return [];
    }
    return addIdToArray(mt940MockData, 'mt940');
    // return [];
  }
};

export const getHostFileTable = async (
  bankName: string = '',
  accountno: string = '',
  fromDate: Date = today,
  toDate: Date = today,
): Promise<HostFile[]> => {
  try {
    const response: HostFile[] = await api.get<HostFile[]>(API_URLS.MT940, {
      bank_name: bankName,
      bankacct: accountno,
      from_date: format(fromDate, 'yyyy-MM-dd'),
      to_date: format(toDate, 'yyyy-MM-dd'),
    });
    return addIdToArray(response, 'host_file');
  } catch (error) {
    console.error(error);
    if (!accountno) {
      return [];
    }
    return addIdToArray(hostFileMockData, 'host_file');
    // return [];
  }
};

export const getMatchingEpaymentTable = async (fileName: string, accountNo: string): Promise<EPayment[]> => {
  try {
    const response: EPayment[] = await api.get<EPayment[]>(API_URLS.MATCHING.EPAYMENTS, {
      file: fileName,
      account: accountNo,
    });
    return addIdToArray(response, 'matching_ePayment');
  } catch (error) {
    console.error(error);
    return addIdToArray(EPaymentMockData, 'matching_ePayment');
    // return [];
  }
};

export const getMatchingNonEpaymentTable = async (fileName: string, accountNo: string): Promise<EPayment[]> => {
  try {
    const response: EPayment[] = await api.get<EPayment[]>(API_URLS.MATCHING.NON_EPAYMENTS, {
      file: fileName,
      account: accountNo,
    });
    return addIdToArray(response, 'matching_non_ePayment');
  } catch (error) {
    console.error(error);
    return addIdToArray(nonEPaymentMockData, 'matching_non_ePayment');
    // return [];
  }
};

export const getExceptionMT940Table = async (fileName: string, accountNo: string): Promise<ExceptionsMT940[]> => {
  try {
    const response: ExceptionsMT940[] = await api.get<ExceptionsMT940[]>(API_URLS.EXCEPTIONS.MT940, {
      file: fileName,
      account: accountNo,
    });
    return addIdToArray(response, 'exception_mt940');
  } catch (error) {
    console.error(error);
    return addIdToArray(exceptionMT940MockData, 'exception_mt940');
    // return [];
  }
};

export const getExceptionHostFileTable = async (fileName: string, accountNo: string): Promise<ExceptionsHostFile[]> => {
  try {
    const response: ExceptionsHostFile[] = await api.get<ExceptionsHostFile[]>(API_URLS.EXCEPTIONS.HOST_FILES, {
      file: fileName,
      account: accountNo,
    });
    return addIdToArray(response, 'exception_host_file');
  } catch (error) {
    console.error(error);
    return addIdToArray(exceptionHostFileMockData, 'exception_host_file');
    // return [];
  }
};

export const getBanks = async (): Promise<Banks[]> => {
  try {
    const response: Banks[] = await api.get<Banks[]>(API_URLS.BANKS);
    return response;
  } catch (error) {
    console.error(error);
    return banksMockData;
    // return [];
  }
};

export const getAccounts = async (bankName: string = ''): Promise<Accounts[]> => {
  try {
    const response: Accounts[] = await api.get<Accounts[]>(API_URLS.ACCOUNTS, { bankName });
    return response;
  } catch (error) {
    console.error(error);
    if (bankName === 'CITI') {
      return [
        {
          bankacct: '810972017',
        },
      ];
    }
    return accountsMockData;

    // return [];
  }
};

export const exportCSVFile = async (fileName: string) => {
  try {
    const response: [] = await api.get<[]>(API_URLS.EXPORTS.CSV, {});
    return response;
  } catch (error) {
    console.error(error);
    return [
      {
        success: 'success',
      },
    ];
    // return [];
  }
};

export const confirmFile = async () => {
  try {
    const response: [] = await api.post<[]>(API_URLS.CONFIRMATIONS.SAPFIN, {
      sap_file_name: 'DBS_0039007442_20230617',
      sap_from_path: '/apps/pentaho_data/sap-portal/temp/DBS/',
      sap_to_path: '/apps/pentaho_data/sap-portal/output-csv/DBS/0039007442/',
      sap_to_path_xml: '/apps/pentaho_data/sap-portal/output-xml/DBS/0039007442/',
      param_account: '0039007442',
      param_file: 'SINPOO01XXXX.CASP_MT940.D230617104353.txt',
    });
    return response;
  } catch (error) {
    console.error(error);
    return [
      {
        success: 'success',
      },
    ];
    // return [];
  }
};
