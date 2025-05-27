import React from 'react';
import { CommonTable } from '@libs/ui-shared';
import { ColumnConfig } from '@libs/types';

const Table: React.FC = () => {
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
      <CommonTable columns={columns} data={[]} enableSearch />
    </div>
  );
};

export default Table;
