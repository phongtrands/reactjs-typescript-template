/* eslint-disable no-duplicate-imports */
import React from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { Box, Grid } from '@mui/material';

import { Button, Calendar, Dropdown } from '~/components';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { updateSearch, updateSummary } from '~/redux';
import { getAccounts, getHostFileTable, getMT940Table } from '~/services';
import type { Accounts, Banks, Search } from '~/types';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchData: Search = useAppSelector((state) => state.epayment.summary.search);
  const bankName: string = useAppSelector((state) => state.epayment.summary.search.bankName);
  const banks: Banks[] = useAppSelector((state) => state.epayment.summary.search.banks);
  const accountNo: string = useAppSelector((state) => state.epayment.summary.search.accountNo);
  const accounts: Accounts[] = useAppSelector((state) => state.epayment.summary.search.accounts);
  const fDate: Date = useAppSelector((state) => state.epayment.summary.search.fromDate);
  const tDate: Date = useAppSelector((state) => state.epayment.summary.search.toDate);

  const handleSearch = async () => {
    const [mt940Data, hostFileData] = await Promise.all([
      getMT940Table(bankName, accountNo, fDate, tDate),
      getHostFileTable(bankName, accountNo, fDate, tDate),
    ]);
    dispatch(
      updateSummary({
        search: searchData,
        mt940Table: mt940Data,
        hostFileTable: hostFileData,
      }),
    );
  };

  const handleChangeBankDropdown = async (event: SelectChangeEvent) => {
    const { value } = event.target;
    const accounts = await getAccounts(value);
    dispatch(
      updateSearch({
        ...searchData,
        bankName: value,
        accounts: accounts,
        accountNo: accounts[0].bankacct,
      }),
    );
  };

  const handleChangeAccountDropdown = async (event: SelectChangeEvent) => {
    const { value } = event.target;
    dispatch(
      updateSearch({
        ...searchData,
        accountNo: value,
      }),
    );
  };

  const handleCalendar = (fromDate: Date | null, toDate: Date | null) => {
    dispatch(
      updateSearch({
        ...searchData,
        fromDate: fromDate || fDate,
        toDate: toDate || tDate,
      }),
    );
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ pt: 3, pl: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Dropdown
            label='Bank'
            name='bank'
            options={banks.map((item) => {
              return { value: item.bankName, label: item.bankName };
            })}
            value={bankName || ''}
            styleSelect={{ width: '70%', backgroundColor: 'white' }}
            onChange={handleChangeBankDropdown}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Dropdown
            label='Account No'
            name='accountNo'
            options={accounts.map((item) => {
              return { value: item.bankacct, label: item.bankacct };
            })}
            value={accountNo || ''}
            styleSelect={{ width: '70%', backgroundColor: 'white' }}
            onChange={handleChangeAccountDropdown}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Calendar
            label='Bank Statement Date'
            defaultFromDate={fDate}
            defaultToDate={tDate}
            onChange={handleCalendar}
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
