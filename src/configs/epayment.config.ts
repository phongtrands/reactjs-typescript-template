import type { ColumnConfig, HostFile, MT940 } from '~/types';

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
