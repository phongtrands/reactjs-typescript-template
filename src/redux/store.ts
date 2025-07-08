import { configureStore } from '@reduxjs/toolkit';

import sapfinSlice from './sapfinSlice';
import popupSlice from './popupSlice';

const store = configureStore({
  reducer: {
    sapfin: sapfinSlice.reducer,
    popup: popupSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
