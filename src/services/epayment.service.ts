import {
  accountData,
  bankConfigData,
  bankData,
  EPaymentData,
  ExceptionData,
  ExceptionHostFileData,
  hostFileData,
  mt940Data,
} from '~/configs/mockData';
import { API_URLS } from '~/constants';
import type {
  Accounts,
  BankConfig,
  Banks,
  EPayment,
  ExceptionsHostFile,
  ExceptionsMT940,
  HostFile,
  MT940,
} from '~/types';
import { api } from '~/utils';

const today = new Date();

export const getSummaryData = async () => {
  const banks = await getBanks();
  const bankConfig = await getBankConfig(banks[0].bank_name);
  const accounts = await getAccounts(banks[0].bank_name);
  const mt940Table = await getMT940Table(banks[0].bank_name);
  const hostFileTable = await getHostFileTable(banks[0].bank_name);
  const data = {
    search: {
      bank: bankConfig[0],
      bankOption: banks,
      accountNo: accounts[0]?.bankacct || '',
      accountOption: accounts,
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
      from_date: fromDate,
      to_date: toDate,
    });
    return response;
  } catch (error) {
    if (!accountno) {
      console.error(error);
      return [];
    }
    return mt940Data;
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
    // let response = hostFileData as HostFile[];
    const response: MT940[] = await api.get<MT940[]>(API_URLS.MT940, {
      bank_name: bankName,
      bankacct: accountno,
      from_date: fromDate,
      to_date: toDate,
    });
    return response;
  } catch (error) {
    console.error(error);
    if (!accountno) {
      return [];
    }
    return hostFileData;
    // return [];
  }
};

export const getMatchingEpaymentTable = async (fileName: string, accountNo: string): Promise<EPayment[]> => {
  try {
    const response: EPayment[] = await api.get<EPayment[]>(API_URLS.MATCHING.EPAYMENTS, {
      file: fileName,
      account: accountNo,
    });
    return response;
  } catch (error) {
    console.error(error);
    return EPaymentData;
    // return [];
  }
};

export const getMatchingNonEpaymentTable = async (fileName: string, accountNo: string): Promise<EPayment[]> => {
  try {
    const response: EPayment[] = await api.get<EPayment[]>(API_URLS.MATCHING.NON_EPAYMENTS, {
      file: fileName,
      account: accountNo,
    });
    return response;
  } catch (error) {
    console.error(error);
    return EPaymentData;
    // return [];
  }
};

export const getExceptionMT940Table = async (fileName: string, accountNo: string): Promise<ExceptionsMT940[]> => {
  try {
    const response: ExceptionsMT940[] = await api.get<ExceptionsMT940[]>(API_URLS.EXCEPTIONS.MT940, {
      file: fileName,
      account: accountNo,
    });
    return response;
  } catch (error) {
    console.error(error);
    return ExceptionData;
    // return [];
  }
};

export const getExceptionHostFileTable = async (fileName: string, accountNo: string): Promise<ExceptionsHostFile[]> => {
  try {
    const response: ExceptionsHostFile[] = await api.get<ExceptionsHostFile[]>(API_URLS.EXCEPTIONS.HOST_FILES, {
      file: fileName,
      account: accountNo,
    });
    return response;
  } catch (error) {
    console.error(error);
    return ExceptionHostFileData;
    // return [];
  }
};

export const getBanks = async (): Promise<Banks[]> => {
  try {
    const response: Banks[] = await api.get<Banks[]>(API_URLS.BANKS);
    return response;
  } catch (error) {
    console.error(error);
    return bankData;
    // return [];
  }
};

export const getBankConfig = async (bankName: string = ''): Promise<BankConfig[]> => {
  try {
    let response = bankConfigData as BankConfig[];
    if (bankName === 'CITI') {
      response = [
        {
          bank_name: 'CITI',
          csv_file_path_tmp: '/apps/pentaho_data/sap-portal/temp/CITI/',
          csv_file_path_bank: '/apps/pentaho_data/sap-portal/output-csv/CITI/',
          file_download_url: 'http://10.168.15.174:8081/api/v1/download',
          sap_portal_url: 'http://10.168.15.174:8080/sap-portal/',
        },
      ];
    }
    return response;
  } catch (error) {
    console.error(error);
    return [];
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
    return accountData;

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
      sap_to_path: '/apps/pentaho_data/sap-portal/output-csv/DBS/0039007442/',
      sap_file_name: 'DBS_0039007442_20230617',
      sap_from_path: '/apps/pentaho_data/sap-portal/temp/DBS/',
      param_account: '0039007442',
      param_file: 'SINPOO01XXXX.CASP_MT940.D230617104353.txt',
      sap_to_path_xml: '/apps/pentaho_data/sap-portal/output-xml/DBS/0039007442/',
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
