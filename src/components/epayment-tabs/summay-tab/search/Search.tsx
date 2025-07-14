/* eslint-disable no-duplicate-imports */
import React from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { Box, Grid } from '@mui/material';

import { Button, Calendar, Dropdown } from '~/components';
import { useAppDispatch, useAppSelector } from '~/redux/hook';
import { updateSearch, updateSummary } from '~/redux';
import { getAccount, getBankConfig, getHostFileTable, getMT940Table } from '~/services';
import type { Bank } from '~/types';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state) => state.epayment.summary.search);
  const bank: Bank = useAppSelector((state) => state.epayment.summary.search.bank);
  const bankOption = useAppSelector((state) => state.epayment.summary.search.bankOption);
  const account = useAppSelector((state) => state.epayment.summary.search.account);
  const accountOption = useAppSelector((state) => state.epayment.summary.search.accountOption);
  const fDate = useAppSelector((state) => state.epayment.summary.search.fromDate);
  const tDate = useAppSelector((state) => state.epayment.summary.search.toDate);

  const handleSearch = async () => {
    const [mt940Data, hostFileData] = await Promise.all([
      getMT940Table(bank.bank_name, account, fDate, tDate),
      getHostFileTable(bank.bank_name, account, fDate, tDate),
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
    const [bankConfigs, accountdata] = await Promise.all([getBankConfig(value), getAccount(value)]);
    dispatch(
      updateSearch({
        ...searchData,
        bank: bankConfigs[0],
        accountOption: accountdata,
        account: accountdata[0].bankacct,
      }),
    );
  };

  const handleChangeAccountDropdown = async (event: SelectChangeEvent) => {
    const { value } = event.target;
    dispatch(
      updateSearch({
        ...searchData,
        account: value,
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
            options={bankOption.map((item) => {
              return { value: item.bank_name, label: item.bank_name };
            })}
            value={bank.bank_name || ''}
            styleSelect={{ width: '70%' }}
            onChange={handleChangeBankDropdown}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Dropdown
            label='Account No'
            name='accountNo'
            options={accountOption.map((item) => {
              return { value: item.bankacct, label: item.bankacct };
            })}
            value={account || ''}
            styleSelect={{ width: '70%' }}
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
