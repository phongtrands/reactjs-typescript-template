import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import './search.scss';
import { Button, Calendar, Dropdown } from '@core/components';
import { useAppDispatch } from '@core/services';
import { search } from '../../../services/stores';
import sortBy from 'lodash/sortBy';

const Search: React.FC = () => {
  const [bankName, setBankName] = useState<string | undefined>(undefined);
  const [accountNo, setAccountNo] = useState<string | undefined>(undefined);
  const [bankStatementDate, setBankStatementDate] = useState<{ fromDate: Date | undefined; toDate: Date | undefined }>({
    fromDate: new Date(),
    toDate: new Date(),
  });
  const [bankOptions, setBankOptions] = useState([
    { label: 'Bank A', value: 'bankA' },
    { label: 'Bank B', value: 'bankB' },
    { label: 'Bank C', value: 'bankC' },
  ]);
  const [accountNoOptions, setAccountNoOption] = useState([
    { label: '123456', value: '123456' },
    { label: '789012', value: '789012' },
  ]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bankOptions.length) {
      setBankName(sortBy(bankOptions, 'label')[0].value);
    }
    if (accountNoOptions.length) {
      setAccountNo(sortBy(accountNoOptions, 'label')[0].value);
    }
  }, [bankOptions, accountNoOptions]);

  const handleSearch = () => {
    dispatch(
      search({
        bankName,
        accountNo,
        bankStatementDate: {
          fromDate: bankStatementDate.fromDate,
          toDate: bankStatementDate.toDate,
        },
      }),
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'end', gap: '80px' }}>
      <Dropdown
        className='sp-dropdown'
        label='Bank'
        value={bankName}
        onChange={(value: SelectChangeEvent) => setBankName(value.target.value)}
        options={bankOptions}
      />
      <Dropdown
        className='sp-dropdown'
        label='Account No'
        value={accountNo}
        onChange={(value: SelectChangeEvent) => setAccountNo(value.target.value)}
        options={accountNoOptions}
      />
      <Calendar
        className='sp-calendar'
        label='Bank Statement Date'
        defaultFromDate={bankStatementDate.fromDate}
        defaultToDate={bankStatementDate.toDate}
        onSelect={(fromDate: Date | undefined, toDate: Date | undefined) => setBankStatementDate({ fromDate, toDate })}
      />
      <Button className='sp-button' onClick={handleSearch} variant='outlined'>
        Search
      </Button>
    </div>
  );
};

export default Search;
