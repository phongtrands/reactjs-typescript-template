import epaymentSlice from './epayment.slice';

import { EPAYMENT_TAB, TYPE_FILE } from '~/configs';
import {
  accountsMockData,
  banksMockData,
  EPaymentMockData,
  exceptionHostFileMockData,
  exceptionMT940MockData,
  mt940MockData,
  nonEPaymentMockData,
} from '~/configs/mockData';
import type { SummaryTab, MatchingTab, ExceptionsTab, Search } from '~/types';
import { addIdToArray } from '~/utils';

const { actions, reducer } = epaymentSlice;

describe('epaymentSlice', () => {
  let initialState: ReturnType<typeof reducer>;

  beforeEach(() => {
    initialState = reducer(undefined, { type: '' });
  });

  it('should return the initial state', () => {
    expect(initialState.typeFile).toBe(TYPE_FILE.MT940);
    expect(initialState.tab).toBe(EPAYMENT_TAB.SUMMARY);
    expect(initialState.selectedFile).toBe('');
    expect(initialState.summary.mt940Table).toEqual([]);
    expect(initialState.matching.matchingEPayment).toEqual([]);
    expect(initialState.exceptions.exceptionMT940).toEqual([]);
  });

  it('should handle changeTypeFile', () => {
    const newState = reducer(initialState, actions.changeTypeFile(TYPE_FILE.HOST_FILE));
    expect(newState.typeFile).toBe(TYPE_FILE.HOST_FILE);
  });

  it('should handle changeSelectedFile', () => {
    const newState = reducer(initialState, actions.changeSelectedFile('file1.txt'));
    expect(newState.selectedFile).toBe('file1.txt');
  });

  it('should handle changeTab', () => {
    const newState = reducer(initialState, actions.changeTab(EPAYMENT_TAB.MATCHING));
    expect(newState.tab).toBe(EPAYMENT_TAB.MATCHING);
  });

  it('should handle updateSummary', () => {
    const summaryData: SummaryTab = {
      search: {
        bankName: 'DBS',
        banks: banksMockData,
        accountNo: '0039007442',
        accounts: accountsMockData,
        fromDate: new Date('2023-01-01'),
        toDate: new Date('2023-12-31'),
      },
      mt940Table: addIdToArray(mt940MockData),
      hostFileTable: addIdToArray([]),
    };

    const newState = reducer(initialState, actions.updateSummary(summaryData));
    expect(newState.summary).toEqual(summaryData);
  });

  it('should handle updateMatching', () => {
    const matchingData: MatchingTab = {
      file: 'SINPOO01XXXX.CASP_MT940.D220415042613.txt',
      accountNo: '0039007442',
      bank: 'DBS',
      matchingEPayment: addIdToArray(EPaymentMockData),
      matchingNonEPayment: addIdToArray(nonEPaymentMockData),
    };

    const newState = reducer(initialState, actions.updateMatching(matchingData));
    expect(newState.matching).toEqual(matchingData);
  });

  it('should handle updateExceptions', () => {
    const exceptionsData: ExceptionsTab = {
      file: 'SINPOO01XXXX.CASP_MT940.D220415042613.txt',
      accountNo: '0039007442',
      bank: 'DBS',
      exceptionMT940: addIdToArray(exceptionMT940MockData),
      exceptionHostFile: addIdToArray(exceptionHostFileMockData),
    };

    const newState = reducer(initialState, actions.updateExceptions(exceptionsData));
    expect(newState.exceptions).toEqual(exceptionsData);
  });

  it('should handle updateSearch', () => {
    const searchData: Search = {
      bankName: 'DBS',
      banks: banksMockData,
      accountNo: '0039007442',
      accounts: accountsMockData,
      fromDate: new Date('2024-01-01'),
      toDate: new Date('2024-12-31'),
    };

    const newState = reducer(initialState, actions.updateSearch(searchData));
    expect(newState.summary.search).toEqual(searchData);
  });
});
