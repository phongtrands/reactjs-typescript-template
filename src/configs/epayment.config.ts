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

export enum EXPORT_TYPE {
  MT940_FILE = 'MT940_FILE',
  HOST_FILE = 'HOST_FILE',
  MATCHING_MT940_FILE = 'MATCHING_MT940_FILE',
  MATCHING_HOST_FILE = 'MATCHING_HOST_FILE',
  EXCEPTION_MT940_FILE = 'EXCEPTION_MT940_FILE',
  EXCEPTION_HOST_FILE = 'EXCEPTION_HOST_FILE',
}

export const hostFileColumns: ColumnConfig<HostFile>[] = [
  { headerName: 'Host File Name', field: 'fileName', align: 'left', type: 'text' },
  { headerName: 'Host File Receipt', field: 'fileReceivedDate', align: 'center', type: 'text' },
  { headerName: 'Count', field: 'count', align: 'right', type: 'number' },
  { headerName: 'Action', field: 'action', align: 'center', type: 'iconAction' },
  { headerName: 'Download', field: 'download', align: 'center', type: 'iconDownload' },
];

export const mt940Columns: ColumnConfig<MT940>[] = [
  { headerName: 'MT940 File Name', field: 'fileName', align: 'left', type: 'text' },
  { headerName: 'MT940 File Date', field: 'fileDate', align: 'left', type: 'text' },
  { headerName: 'Match Status', field: 'matchingStatus', align: 'center', type: 'status' },
  { headerName: 'SAPFIN Status', field: 'sapfinStatus', align: 'center', type: 'status' },
  { headerName: 'Count', field: 'count', align: 'right', type: 'number' },
  { headerName: 'Action', field: 'action', align: 'center', type: 'doubleAction' },
  { headerName: 'Download', field: 'download', align: 'center', type: 'iconDownload' },
];

export const EPayMentColumns: ColumnConfig<EPayment>[] = [
  { headerName: 'Payment Method', field: 'paymentMethod', align: 'left', type: 'text' },
  { headerName: 'Statement Date', field: 'statementDate', align: 'left', type: 'text' },
  { headerName: 'Value Date', field: 'valueDate', align: 'left', type: 'text' },
  { headerName: 'Amount', field: 'count', align: 'right', type: 'number' },
];

export const exceptionsMT940Columns: ColumnConfig<ExceptionsMT940>[] = [
  { headerName: 'Txn Reference Id', field: 'referAccountOwner', align: 'left', type: 'text' },
  { headerName: 'System', field: 'sourceSystem', align: 'left', type: 'text' },
  { headerName: 'Payment Menthod', field: 'paymentMethod', align: 'left', type: 'text' },
  { headerName: 'Debit/Credit', field: 'dcMark', align: 'left', type: 'text' },
  { headerName: 'Statement Date', field: 'statementDate', align: 'left', type: 'text' },
  { headerName: 'Value Date', field: 'valueDate', align: 'left', type: 'text' },
  { headerName: 'Business Date', field: 'businessDate', align: 'left', type: 'text' },
  { headerName: 'Amount', field: 'amount', align: 'right', type: 'number' },
];

export const exceptionsHostFileColumns: ColumnConfig<ExceptionsHostFile>[] = [
  { headerName: 'Txn Reference Id', field: 'transactionReferenceId', align: 'left', type: 'text' },
  { headerName: 'System', field: 'sourceSystem', align: 'left', type: 'text' },
  { headerName: 'Payment Menthod', field: 'paymentMethod', align: 'left', type: 'text' },
  { headerName: 'Debit/Credit', field: 'dcMark', align: 'left', type: 'text' },
  { headerName: 'Business Date', field: 'businessDate', align: 'left', type: 'text' },
  { headerName: 'Amount', field: 'amount', align: 'right', type: 'number' },
  { headerName: 'Transaction Status', field: 'transactionStatus', align: 'left', type: 'text' },
  { headerName: 'Transaction Flag', field: 'transactionFlag', align: 'left', type: 'text' },
  { headerName: 'Bank Transfer Id', field: 'bankTransferId', align: 'left', type: 'text' },
  { headerName: 'Bank Txn Ref Id', field: 'bankTxnRefId', align: 'left', type: 'text' },
  { headerName: 'Original Ref Id', field: 'originalRefId', align: 'left', type: 'text' },
];
