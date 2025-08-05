import { enqueueSnackbar } from 'notistack';
import React from 'react';

import { Table } from '~/components';
import { EPAYMENT_TAB, EXPORT_TYPE, hostFileColumns } from '~/configs';
import { changeSelectedFile, changeTab } from '~/redux';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { exportCSVFile } from '~/services';
import type { HostFile } from '~/types';

const HostFile: React.FC = () => {
  const dispatch = useAppDispatch();
  const hostFileData: HostFile[] = useAppSelector((state) => state.epayment.summary.hostFileTable);
  const accountNo: string = useAppSelector((state) => state.epayment.summary.search.accountNo);

  const handleAction = async (row: HostFile, fieldName: string) => {
    switch (fieldName) {
      case 'action':
        {
          dispatch(changeSelectedFile(row.fileName));
          dispatch(changeTab(EPAYMENT_TAB.EXCEPTION));
        }
        break;
      case 'download':
        {
          const response = await exportCSVFile(EXPORT_TYPE.HOST_FILE, accountNo, row.fileName);
          if (response) {
            enqueueSnackbar('File download successfully ', { variant: 'success' });
          }
        }
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Table
        columns={hostFileColumns}
        data={hostFileData}
        enableSearch
        pagination
        backgroundHeader='#f2f2f2'
        onClick={handleAction}
      />
    </div>
  );
};

export default HostFile;
