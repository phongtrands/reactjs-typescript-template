/* eslint-disable no-duplicate-imports */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AuthState } from '~/types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: '',
    name: '',
    email: '',
    roles: '',
    tenantId: '',
  },
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export default authSlice;
