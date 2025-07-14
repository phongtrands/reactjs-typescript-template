import { configureStore } from '@reduxjs/toolkit';

import sapfinSlice from './sapfin.slice';
import popupSlice from './popup.slice';
import epaymentSlice from './epayment.slice';

const store = configureStore({
  reducer: {
    sapfin: sapfinSlice.reducer,
    popup: popupSlice.reducer,
    epayment: epaymentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
