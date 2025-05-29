import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import './search.scss';
import { Button, Calendar, Dropdown } from '@core/components';

const Search: React.FC = () => {
  const [bank, setBank] = useState<string | undefined>(undefined);
  const [accountNo, setAccountNo] = useState<string | undefined>(undefined);
  const [bankStatementDate, setBankStatementDate] = useState<{ fromDate: Date | undefined; toDate: Date | undefined }>({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const handleSearch = () => {
    console.log('Search clicked with:', { bank, accountNo, bankStatementDate });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Dropdown
        className='sp-dropdown'
        label='Bank'
        value={bank}
        onChange={(value: SelectChangeEvent) => setBank(value.target.value)}
        options={[
          { label: 'Bank A', value: 'bankA' },
          { label: 'Bank B', value: 'bankB' },
        ]}
      />
      <Dropdown
        className='sp-dropdown'
        label='Account No'
        value={accountNo}
        onChange={(value: SelectChangeEvent) => setAccountNo(value.target.value)}
        options={[
          { label: '123456', value: '123456' },
          { label: '789012', value: '789012' },
        ]}
      />
      <Calendar
        className='sp-calendar'
        label='Bank Statement Date'
        defaultFromDate={bankStatementDate.fromDate}
        defaultToDate={bankStatementDate.toDate}
        onSelect={(fromDate: Date | undefined, toDate: Date | undefined) => setBankStatementDate({ fromDate, toDate })}
      />
      <Button className='sp-button' onClick={handleSearch} variant='contained'>
        Search
      </Button>
    </div>
  );
};

export default Search;
