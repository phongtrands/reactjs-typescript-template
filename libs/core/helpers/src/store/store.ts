import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

const createStore = (reducers: { [key: string]: Reducer }) => {
  const rootReducer = combineReducers(reducers);
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export default createStore;