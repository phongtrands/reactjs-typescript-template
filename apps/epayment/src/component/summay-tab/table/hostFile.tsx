import React from 'react';
import { Table } from '@core/components';
import { ColumnConfig } from '@core/types';
import { Mt940Columns } from '../../../config/table';

const HostFile: React.FC = () => {
  const columns: ColumnConfig<never>[] = Mt940Columns;
  return (
    <div>
      <Table columns={columns} data={[]} enableSearch />
    </div>
  );
};

export default HostFile;
