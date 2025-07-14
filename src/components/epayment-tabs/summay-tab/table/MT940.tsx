import React from 'react';

import { Table } from '~/components';
import { EPAYMENT_TAB, mt940Columns } from '~/configs';
import { changeTab, updateExceptions, updateMatching } from '~/redux';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import {
  getExceptionHostFileTable,
  getExceptionMT940Table,
  getMatchingEpaymentTable,
  getMatchingNonEpaymentTable,
} from '~/services';
import type { MT940 } from '~/types';

const Mt940: React.FC = () => {
  const dispatch = useAppDispatch();
  const mt940Data: MT940[] = useAppSelector((state) => state.epayment.summary.mt940Table);
  const accountNo = useAppSelector((state) => state.epayment.summary.search.account);
  const bankName = useAppSelector((state) => state.epayment.summary.search.bank.bank_name);

  const handleAction = async (row: any, fieldName: string, event: any) => {
    let tab: string = EPAYMENT_TAB.MATCHING;
    const [ePayment, nonEPayment, eMT940, eHostFile] = await Promise.all([
      getMatchingEpaymentTable(row.file_name, accountNo),
      getMatchingNonEpaymentTable(row.file_name, accountNo),
      getExceptionMT940Table(row.file_name, accountNo),
      getExceptionHostFileTable(row.file_name, accountNo),
    ]);
    dispatch(
      updateMatching({
        file: row.file_name,
        accountNo: accountNo,
        bank: bankName,
        matching_epayment: ePayment,
        matching_nonEpayment: nonEPayment,
      }),
      updateExceptions({
        file: row.file_name,
        accountNo: accountNo,
        bank: bankName,
        exceptionMT940: eMT940,
        exceptionHostFile: eHostFile,
      }),
    );
    if (fieldName === 'action_warning') {
      tab = EPAYMENT_TAB.EXCEPTION;
    }
    dispatch(changeTab(tab));
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
