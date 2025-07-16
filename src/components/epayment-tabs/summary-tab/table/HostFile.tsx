import React from 'react';

import { Table } from '~/components';
import { EPAYMENT_TAB, hostFileColumns } from '~/configs';
import { changeTab, updateExceptions, updateMatching } from '~/redux';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import {
  getExceptionHostFileTable,
  getExceptionMT940Table,
  getMatchingEpaymentTable,
  getMatchingNonEpaymentTable,
} from '~/services';
import type { HostFile } from '~/types';

const HostFile: React.FC = () => {
  const dispatch = useAppDispatch();
  const hostFileData: HostFile[] = useAppSelector((state) => state.epayment.summary.hostFileTable);
  const accountNo: string = useAppSelector((state) => state.epayment.summary.search.accountNo);
  const bankName: string = useAppSelector((state) => state.epayment.summary.search.bank.bank_name);

  const handleAction = async (row: HostFile) => {
    const [ePayment, nonEPayment, eMT940, eHostFile] = await Promise.all([
      getMatchingEpaymentTable(row?.file_name || '', accountNo),
      getMatchingNonEpaymentTable(row?.file_name || '', accountNo),
      getExceptionMT940Table(row.file_name || '', accountNo),
      getExceptionHostFileTable(row.file_name || '', accountNo),
    ]);
    dispatch(
      updateMatching({
        file: row.file_name || '',
        accountNo: accountNo,
        bank: bankName,
        matchingEPayment: ePayment,
        matchingNonEPayment: nonEPayment,
      }),
    );
    dispatch(
      updateExceptions({
        file: row.file_name || '',
        accountNo: accountNo,
        bank: bankName,
        exceptionMT940: eMT940,
        exceptionHostFile: eHostFile,
      }),
    );
    dispatch(changeTab(EPAYMENT_TAB.EXCEPTION));
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
