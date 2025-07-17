/* eslint-disable no-duplicate-imports */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { EPAYMENT_TAB, TYPE_FILE } from '~/configs';
import type { EpaymentState, ExceptionsTab, MatchingTab, Search, SummaryTab } from '~/types';

const initialState: EpaymentState = {
  typeFile: TYPE_FILE.MT940,
  tab: EPAYMENT_TAB.SUMMARY,
  summary: {
    search: {
      bankName: '',
      banks: [],
      accountNo: '',
      accounts: [],
      fromDate: new Date(),
      toDate: new Date(),
    },
    mt940Table: [],
    hostFileTable: [],
  },
  matching: {
    file: '',
    accountNo: '',
    bank: '',
    matchingEPayment: [],
    matchingNonEPayment: [],
  },
  exceptions: {
    file: '',
    accountNo: '',
    bank: '',
    exceptionMT940: [],
    exceptionHostFile: [],
  },
};

const epaymentSlice = createSlice({
  name: 'epayment',
  initialState,
  reducers: {
    changeTypeFile(state, action: PayloadAction<string>) {
      state.typeFile = action.payload;
    },
    changeTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;
    },
    updateSummary(state, action: PayloadAction<SummaryTab>) {
      state.summary = action.payload;
    },
    updateMatching(state, action: PayloadAction<MatchingTab>) {
      state.matching = action.payload;
    },
    updateExceptions(state, action: PayloadAction<ExceptionsTab>) {
      state.exceptions = action.payload;
    },
    updateSearch(state, action: PayloadAction<Search>) {
      state.summary.search = action.payload;
    },
  },
});

export default epaymentSlice;
