import React from 'react';

// import { Mt940Columns } from '../../../config/table';

import type { ColumnConfig } from '~/types';
import { Table } from '~/components';
import { hostFileData } from '~/configs/mockData';

interface HostFile {
  id: number;
  file_name?: string;
  file_recvd_date?: string;
  sum?: number;
  action?: string;
  download?: string;
}

const HostFile: React.FC = () => {
  const hostFileColumns: ColumnConfig<HostFile>[] = [
    { headerName: 'Host File Name', field: 'file_name', align: 'left', type: 'text' },
    { headerName: 'Host File Receipt', field: 'file_recvd_date', align: 'center', type: 'text' },
    { headerName: 'Count', field: 'sum', align: 'right', type: 'number' },
    { headerName: 'Action', field: 'action', align: 'center', type: 'iconAction' },
    { headerName: 'Download', field: 'download', align: 'center', type: 'iconDownload' },
  ];
  return (
    <div>
      <Table columns={hostFileColumns} data={hostFileData} enableSearch pagination backgroundHeader='#f2f2f2' />
    </div>
  );
};

export default HostFile;
