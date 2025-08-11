import { enqueueSnackbar } from 'notistack';
import React from 'react';

import { Table } from '~/components';
import { EPAYMENT_TAB, EXPORT_TYPE, mt940Columns } from '~/configs';
import { MESSAGES } from '~/constants';
import { changeSelectedFile, changeTab } from '~/redux';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { exportCSVFile } from '~/services';
import type { MT940 } from '~/types';

const Mt940: React.FC = () => {
  const dispatch = useAppDispatch();
  const mt940Data: MT940[] = useAppSelector((state) => state.epayment.summary.mt940Table);
  const accountNo: string = useAppSelector((state) => state.epayment.summary.search.accountNo);

  const handleAction = async (row: MT940, fieldName: string) => {
    switch (fieldName) {
      case 'action_primary':
        {
          dispatch(changeSelectedFile(row.fileName));
          dispatch(changeTab(EPAYMENT_TAB.MATCHING));
        }
        break;
      case 'action_warning':
        {
          dispatch(changeSelectedFile(row.fileName));
          dispatch(changeTab(EPAYMENT_TAB.EXCEPTION));
        }
        break;
      case 'download':
        {
          const response = await exportCSVFile(EXPORT_TYPE.MT940_FILE, accountNo, row.fileName);
          if (response) {
            enqueueSnackbar(MESSAGES.FILE.DOWNLOAD_SUCCESS, { variant: 'success' });
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
        columns={mt940Columns}
        data={mt940Data}
        enableSearch
        pagination
        backgroundHeader='#f2f2f2'
        onClick={handleAction}
      />
    </div>
  );
};

export default Mt940;
