import React from 'react';
import { Table } from '@core/components';
import { ColumnConfig } from '@core/types';
import { Mt940Columns } from '../../../config/table';
import { mt940Data } from '../../../config/mockData';

interface MT940 {
  id: number;
  file_name?: string;
  file_date?: string;
  matching_status?: string;
  sapfin_status?: string;
  row_count?: number;
  action?: string;
  download?: string;
}

const Mt940: React.FC = () => {

const Mt940Columns: ColumnConfig<MT940>[] = [
  { headerName: 'MT940 File Name', field: 'file_name', align: 'left', type: 'text' },
  { headerName: 'MT940 File Date', field: 'file_date', align: 'center', type: 'text' },
  { headerName: 'Match Status', field: 'matching_status', align: 'center', type: 'status-green' },
  { headerName: 'SAPFIN Status', field: 'sapfin_status', align: 'center', type: 'status-yellow' },
  { headerName: 'Count', field: 'row_count', align: 'center', type: 'number' },
  { headerName: 'Action', field: 'action', align: 'center', type: 'doubleAction' },
  { headerName: 'Download', field: 'download', align: 'center', type: 'iconDownload' },
];
  return (
    <div>
      <Table<MT940> columns={Mt940Columns} data={mt940Data} enableSearch pagination />
    </div>
  );
};

export default Mt940;
