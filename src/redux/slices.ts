import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from './types';

const initialState: InitialState = {
  original: {
    home: {
      customer: '',
      total: 0,
    },
    user: {
      name: '',
      role: '',
    },
  },
  updated: {
    home: {
      customer: '',
      total: 0,
    },
    user: {
      name: '',
      role: '',
    },
  },
  token: '',
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    updateData: <T extends InitialState['updated']>(state: InitialState, action: PayloadAction<T>) => {
      state.updated = action.payload;
    },
  },
});

export const { updateData } = slice.actions;
export default slice.reducer;
