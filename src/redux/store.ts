import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import reducer from './slices';

const store = configureStore({
  reducer: {
    slice: reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
