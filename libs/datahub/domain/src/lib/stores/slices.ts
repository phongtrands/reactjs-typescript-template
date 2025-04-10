import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../index';

const initialState: User = {
    id: 1,
    userName: '',
    email: '',
    description: '',
    imageUrl: '',
};

const dataHubSlice = createSlice({
  name: 'data-hub',
  initialState,
  reducers: {
    updateUserName: (state: User, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export default dataHubSlice;