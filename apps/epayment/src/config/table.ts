import { ColumnConfig } from '@core/types';

export const Mt940Columns: ColumnConfig<never>[] = [
  { headerName: 'MT940 File Name', field: 'file_name', align: 'left' },
  { headerName: 'MT940 File Date', field: 'file_date', align: 'left' },
  { headerName: 'Match Status', field: 'matching_status', align: 'left' },
  { headerName: 'SAPFIN Status', field: 'sapfin_status', align: 'left' },
  { headerName: 'Count', field: 'row_count', align: 'right' },
  { headerName: 'Action', field: 'action', align: 'left' },
  { headerName: 'Download', field: 'download', align: 'left' },
];
