import type { ColumnConfig, EPayment, ExceptionsHostFile, ExceptionsMT940, HostFile, MT940 } from '~/types';

export enum TYPE_FILE {
  MT940 = 'mt940',
  HOST_FILE = 'hostFile',
}

export enum EPAYMENT_TAB {
  SUMMARY = 'summary',
  MATCHING = 'matching',
  EXCEPTION = 'exception',
}

export const hostFileColumns: ColumnConfig<HostFile>[] = [
  { headerName: 'Host File Name', field: 'file_name', align: 'left', type: 'text' },
  { headerName: 'Host File Receipt', field: 'file_recvd_date', align: 'center', type: 'text' },
  { headerName: 'Count', field: 'sum', align: 'right', type: 'number' },
  { headerName: 'Action', field: 'action', align: 'center', type: 'iconAction' },
  { headerName: 'Download', field: 'download', align: 'center', type: 'iconDownload' },
];

export const mt940Columns: ColumnConfig<MT940>[] = [
  { headerName: 'MT940 File Name', field: 'file_name', align: 'left', type: 'text' },
  { headerName: 'MT940 File Date', field: 'file_date', align: 'left', type: 'text' },
  { headerName: 'Match Status', field: 'matching_status', align: 'center', type: 'status' },
  { headerName: 'SAPFIN Status', field: 'sapfin_status', align: 'center', type: 'status' },
  { headerName: 'Count', field: 'row_count', align: 'right', type: 'number' },
  { headerName: 'Action', field: 'action', align: 'center', type: 'doubleAction' },
  { headerName: 'Download', field: 'download', align: 'center', type: 'iconDownload' },
];

export const EPayMentColumns: ColumnConfig<EPayment>[] = [
  { headerName: 'Payment Method', field: 'payment_method', align: 'left', type: 'text' },
  { headerName: 'Statement Date', field: 'statement_date', align: 'left', type: 'text' },
  { headerName: 'Value Date', field: 'valuedate', align: 'left', type: 'text' },
  { headerName: 'Amount', field: 'amount', align: 'right', type: 'number' },
];

export const exceptionsMT940Columns: ColumnConfig<ExceptionsMT940>[] = [
  { headerName: 'Txn Reference Id', field: 'refer_account_owne', align: 'left', type: 'text' },
  { headerName: 'System', field: 'system', align: 'left', type: 'text' },
  { headerName: 'Payment Menthod', field: 'payment_method', align: 'left', type: 'text' },
  { headerName: 'Debit/Credit', field: 'dc_mark', align: 'left', type: 'text' },
  { headerName: 'Statement Date', field: 'statement_date', align: 'left', type: 'text' },
  { headerName: 'Value Date', field: 'value_date', align: 'left', type: 'text' },
  { headerName: 'Business Date', field: 'business_date', align: 'left', type: 'text' },
  { headerName: 'Amount', field: 'amount', align: 'right', type: 'number' },
];

export const exceptionsHostFileColumns: ColumnConfig<ExceptionsHostFile>[] = [
  { headerName: 'Txn Reference Id', field: 'transaction_reference_id', align: 'left', type: 'text' },
  { headerName: 'System', field: 'source_system', align: 'left', type: 'text' },
  { headerName: 'Payment Menthod', field: 'payment_method', align: 'left', type: 'text' },
  { headerName: 'Debit/Credit', field: 'dc_mark', align: 'left', type: 'text' },
  { headerName: 'Business Date', field: 'business_date', align: 'left', type: 'text' },
  { headerName: 'Amount', field: 'amount', align: 'right', type: 'number' },
  { headerName: 'Transaction Status', field: 'transaction_status', align: 'left', type: 'text' },
  { headerName: 'Transaction Flag', field: 'transaction_flag', align: 'left', type: 'text' },
  { headerName: 'Bank Transfer Id', field: 'bank_transfer_id', align: 'left', type: 'text' },
  { headerName: 'Bank Txn Ref Id', field: 'bank_transaction_reference_id', align: 'left', type: 'text' },
  { headerName: 'Original Ref Id', field: 'original_reference_id', align: 'left', type: 'text' },
];
