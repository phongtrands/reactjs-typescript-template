import React, { useEffect, useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { Box, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import './search.scss';
import { Button, Calendar, Dropdown } from '@core/components';
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

  return (
    // <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '80px', py: 3 }}>
    //   {/* <Dropdown
    //     className='sp-dropdown'
    //     label='Bank'
    //     value={bankName}
    //     onChange={(value: SelectChangeEvent) => setBankName(value.target.value)}
    //     options={bankOptions}
    //     styleSelect={{
    //       width: 160,
    //       // backgroundColor: 'rgb(248, 246, 246)',
    //       // border: 'none',
    //       // outline: 'none',
    //       // padding: '0',
    //       borderRadius: 2,
    //       // height: '40px',
    //     }}
    //   />
    //   <Dropdown
    //     className='sp-dropdown'
    //     label='Account No'
    //     value={accountNo}
    //     onChange={(value: SelectChangeEvent) => setAccountNo(value.target.value)}
    //     options={accountNoOptions}
    //   /> */}
    //   <Box>
    //     <InputLabel className='sp-inputLabel'>Bank</InputLabel>
    //     <Select
    //       className={['sp-select', 'sp-dropdown'].filter(Boolean).join(' ')}
    //       value={bankName || ''}
    //       onChange={(value: SelectChangeEvent) => setBankName(value.target.value)}
    //       sx={{ paddingTop: '1rem' }}
    //     >
    //       {bankOptions.map((option) => (
    //         <MenuItem key={option.value} value={option.value}>
    //           {option.label}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </Box>
    //   <Box>
    //     <InputLabel className='sp-inputLabel'>Account No</InputLabel>
    //     <Select
    //       className={['sp-select', 'sp-dropdown'].filter(Boolean).join(' ')}
    //       value={accountNo || ''}
    //       onChange={(value: SelectChangeEvent) => setAccountNo(value.target.value)}
    //     >
    //       {accountNoOptions.map((option) => (
    //         <MenuItem key={option.value} value={option.value}>
    //           {option.label}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </Box>
    //   <Calendar
    //     className='sp-calendar'
    //     label='Bank Statement Date'
    //     defaultFromDate={bankStatementDate.fromDate}
    //     defaultToDate={bankStatementDate.toDate}
    //     onSelect={(fromDate: Date | undefined, toDate: Date | undefined) => setBankStatementDate({ fromDate, toDate })}
    //   />
    //   <Button className='sp-button' onClick={handleSearch} variant='outlined'>
    //     Search
    //   </Button>
    // </Box>
    <Box>
      <Grid container spacing={2} sx={{ pt: 3, pl: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel className='sp-inputLabel'>Bank</InputLabel>
          <Select
            fullWidth
            className={['sp-select', 'sp-dropdown'].filter(Boolean).join(' ')}
            value={bankName || ''}
            onChange={(value: SelectChangeEvent) => setBankName(value.target.value)}
            sx={{ width: '70%', backgroundColor: '#fff' }}
          >
            {bankOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel className='sp-inputLabel'>Account No</InputLabel>
          <Select
            fullWidth
            className={['sp-select', 'sp-dropdown'].filter(Boolean).join(' ')}
            value={accountNo || ''}
            onChange={(value: SelectChangeEvent) => setAccountNo(value.target.value)}
            sx={{ width: '70%', backgroundColor: '#fff' }}
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
            className='sp-calendar'
            label='Bank Statement Date'
            defaultFromDate={bankStatementDate.fromDate}
            defaultToDate={bankStatementDate.toDate}
            onSelect={(fromDate: Date | undefined, toDate: Date | undefined) =>
              setBankStatementDate({ fromDate, toDate })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
          <Button className='sp-button' onClick={handleSearch} variant='outlined'>
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
