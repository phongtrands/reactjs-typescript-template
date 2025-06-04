import React from 'react';
import { Table } from '@core/components';
import { ColumnConfig } from '@core/types';

const Mt940: React.FC = () => {
  const columns: ColumnConfig<never>[] = [
    { headerName: 'MT940 File Name', field: 'fileName', align: 'left' },
    { headerName: 'MT940 File Date', field: 'fikleDate', align: 'left' },
    { headerName: 'Match Status', field: 'matchStatus', align: 'left' },
    { headerName: 'SAPFIN Status', field: 'sapfinStatus', align: 'left' },
    { headerName: 'Count', field: 'count', align: 'right' },
    { headerName: 'Action', field: 'action', align: 'left' },
    { headerName: 'Download', field: 'download', align: 'left' },
  ];
  return (
    <div>
      <Table columns={columns} data={[]} enableSearch />
    </div>
  );
};

export default Mt940;
