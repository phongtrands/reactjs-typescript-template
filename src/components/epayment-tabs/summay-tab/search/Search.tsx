/* eslint-disable no-duplicate-imports */
import React, { useEffect, useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { Box, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { Button, Calendar } from '~/components';
// import { useAppDispatch } from '@core/services';
// import sortBy from 'lodash/sortBy';

// import { search } from '../../../services/stores';

const Search: React.FC = () => {
  const [bankName, setBankName] = useState<string | undefined>('Bank A');
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
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (bankOptions.length) {
      // setBankName(sortBy(bankOptions, 'label')[0].value);
    }
    if (accountNoOptions.length) {
      // setAccountNo(sortBy(accountNoOptions, 'label')[0].value);
    }
  }, [bankOptions, accountNoOptions]);

  const handleSearch = () => {
    // dispatch(
    //   search({
    //     bankName,
    //     accountNo,
    //     bankStatementDate: {
    //       fromDate: bankStatementDate.fromDate,
    //       toDate: bankStatementDate.toDate,
    //     },
    //   }),
    // );
  };

  const dropdownStyle = { width: '70%', backgroundColor: '#fff', height: '35px' };

  return (
    <Box>
      <Grid container spacing={2} sx={{ pt: 3, pl: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel>Bank</InputLabel>
          <Select
            fullWidth
            value={bankName || ''}
            onChange={(value: SelectChangeEvent) => setBankName(value.target.value)}
            sx={dropdownStyle}
          >
            {bankOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel>Account No</InputLabel>
          <Select
            fullWidth
            value={accountNo || ''}
            onChange={(value: SelectChangeEvent) => setAccountNo(value.target.value)}
            sx={dropdownStyle}
          >
            {accountNoOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Calendar
            label='Bank Statement Date'
            defaultFromDate={bankStatementDate.fromDate}
            defaultToDate={bankStatementDate.toDate}
            onSelect={(fromDate: Date | undefined, toDate: Date | undefined) =>
              setBankStatementDate({ fromDate, toDate })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
          <Button onClick={handleSearch} variant='contained'>
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
