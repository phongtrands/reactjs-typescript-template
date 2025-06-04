import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchPayload, Store } from './type';
import { TYPE_FILE } from '../../config/config';

const initialState: Store = {
  accountNo: undefined,
  bankName: undefined,
  bankStatementDate: undefined,
  typeFile: undefined,
};

const epaymentSlice = createSlice({
  name: 'epayment',
  initialState,
  reducers: {
    search(state, action: PayloadAction<SearchPayload>) {
      state.accountNo = action.payload.accountNo;
      state.bankName = action.payload.bankName;
      state.bankStatementDate = action.payload.bankStatementDate;
    },
    changeTypeFile(state, action: PayloadAction<TYPE_FILE | undefined>) {
      state.typeFile = action.payload;
    },
  },
});

export default epaymentSlice;
