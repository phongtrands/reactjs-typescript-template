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
  const accountNo: string = useAppSelector((state) => state.epayment.summary.search.accountNo);
  const bankName: string = useAppSelector((state) => state.epayment.summary.search.bankName);

  const handleAction = async (row: MT940, fieldName: string) => {
    let tab = EPAYMENT_TAB.MATCHING;
    const [ePayment, nonEPayment, eMT940, eHostFile] = await Promise.all([
      getMatchingEpaymentTable(row.filename || '', accountNo),
      getMatchingNonEpaymentTable(row.filename || '', accountNo),
      getExceptionMT940Table(row.filename || '', accountNo),
      getExceptionHostFileTable(row.filename || '', accountNo),
    ]);
    dispatch(
      updateMatching({
        file: row.filename || '',
        accountNo: accountNo,
        bank: bankName,
        matchingEPayment: ePayment,
        matchingNonEPayment: nonEPayment,
      }),
    );
    dispatch(
      updateExceptions({
        file: row.filename || '',
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
