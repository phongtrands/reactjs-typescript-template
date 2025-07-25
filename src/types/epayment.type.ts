import type { Search } from '@mui/icons-material';

export interface MT940 {
  id: string;
  fileName: string;
  fileDate: string;
  sapfinStatus: string;
  matchingStatus: string;
  count: number;
  action?: string;
  download?: string;
}

export interface HostFile {
  id: string;
  fileName: string;
  fileReceivedDate: string;
  count: number;
  action?: string;
  download?: string;
}

export interface EPayment {
  id: string;
  paymentMethod: string;
  statementDate: string;
  valueDate: string;
  count: number;
}

export interface ExceptionsMT940 {
  id: string;
  referAccountOwner: string;
  sourceSystem: string;
  paymentMethod: string;
  dcMark: string;
  statementDate: string;
  valueDate: string;
  businessDate: string;
  amount: number;
}

export interface ExceptionsHostFile {
  id: string;
  transactionReferenceId?: string;
  sourceSystem: string;
  paymentMethod: string;
  dcMark: string;
  valueDate: string;
  businessDate: string;
  amount: number;
  transactionStatus: string;
  transactionFlag: string;
  bankTransferId: string;
  bankTxnRefId: string;
  originalRefId: string;
}

export interface Banks {
  bankName: string;
  csvFilePathTmp: string;
  csvFilePathBank: string;
  fileDownloadUrl: string;
  sapPortalUrl: string;
}

export interface Accounts {
  bankacct: string;
}

export interface Search {
  bankName: string;
  banks: Banks[];
  accountNo: string;
  accounts: Accounts[];
  fromDate: Date;
  toDate: Date;
}

export interface SummaryTab {
  search: Search;
  mt940Table: MT940[];
  hostFileTable: HostFile[];
}

export interface MatchingTab {
  file: string;
  accountNo: string;
  bank: string;
  matchingEPayment: EPayment[];
  matchingNonEPayment: EPayment[];
}

export interface ExceptionsTab {
  file: string;
  accountNo: string;
  bank: string;
  exceptionMT940: ExceptionsMT940[];
  exceptionHostFile: ExceptionsHostFile[];
}

export interface EpaymentState {
  typeFile: string;
  tab: string;
  selectedFile: string;
  summary: SummaryTab;
  matching: MatchingTab;
  exceptions: ExceptionsTab;
}

export interface ExportCSVFileType {
  header: string[];
  data: Blob;
}
