import React, { useState } from 'react';
import { SpButton, SpCalendar, SpDropdown } from '@shared/ui-components';
import { Button, SelectChangeEvent } from '@mui/material';
import './search.scss';

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
      <SpDropdown
        className='sp-dropdown'
        label='Bank'
        value={bank}
        onChange={(value: SelectChangeEvent) => setBank(value.target.value)}
        options={[
          { label: 'Bank A', value: 'bankA' },
          { label: 'Bank B', value: 'bankB' },
        ]}
      />
      <SpDropdown
        className='sp-dropdown'
        label='Account No'
        value={accountNo}
        onChange={(value: SelectChangeEvent) => setAccountNo(value.target.value)}
        options={[
          { label: '123456', value: '123456' },
          { label: '789012', value: '789012' },
        ]}
      />
      <SpCalendar
        className='sp-calendar'
        label='Bank Statement Date'
        defaultFromDate={bankStatementDate.fromDate}
        defaultToDate={bankStatementDate.toDate}
        onSelect={(fromDate: Date | undefined, toDate: Date | undefined) => setBankStatementDate({ fromDate, toDate })}
      />
      <SpButton className='sp-button' onClick={handleSearch} variant='contained'>
        Search
      </SpButton>
    </div>
  );
};

export default Search;
