import type { Search } from '@mui/icons-material';

export interface MT940 {
  id: number;
  file_name?: string;
  file_date?: string;
  matching_status?: string;
  sapfin_status?: string;
  row_count?: number;
  action?: string;
  download?: string;
}

export interface HostFile {
  id: number;
  file_name?: string;
  file_recvd_date?: string;
  sum?: number;
  action?: string;
  download?: string;
}

export interface EPayment {
  id: number;
  payment_method?: string;
  statement_date?: string;
  valuedate?: string;
  amount?: number;
}

export interface ExceptionsMT940 {
  id: number;
  refer_account_owne?: string;
  system?: string;
  payment_method?: string;
  dc_mark?: string;
  statement_date?: string;
  value_date?: string;
  business_date?: string;
  amount?: number;
}

export interface ExceptionsHostFile {
  id: number;
  transaction_reference_id?: string;
  source_system?: string;
  payment_method?: string;
  dc_mark?: string;
  value_date?: string;
  business_date?: string;
  amount?: number;
  transaction_status?: string;
  transaction_flag?: string;
  bank_transfer_id?: string;
  bank_transaction_reference_id?: string;
  original_reference_id?: string;
}

export interface Banks {
  bank_name: string;
}

export interface BankConfig {
  bank_name: string;
  csv_file_path_tmp?: string;
  csv_file_path_bank?: string;
  file_download_url?: string;
  sap_portal_url?: string;
}

export interface Accounts {
  bankacct: string;
}

export interface Search {
  bank: BankConfig;
  bankOption: Banks[];
  accountNo: string;
  accountOption: Accounts[];
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
  summary: SummaryTab;
  matching: MatchingTab;
  exceptions: ExceptionsTab;
}
