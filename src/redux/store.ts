import { configureStore } from '@reduxjs/toolkit';

import reducer from './slices';

const store = configureStore({
  reducer: {
    sapfin: reducer.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
