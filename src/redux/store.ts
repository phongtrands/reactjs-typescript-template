import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth.slice';
import popupSlice from './popup.slice';
import epaymentSlice from './epayment.slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    popup: popupSlice.reducer,
    epayment: epaymentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
