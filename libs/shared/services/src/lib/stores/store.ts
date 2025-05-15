import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

const createStore = (reducers: { [key: string]: Reducer }) => {
  const rootReducer = combineReducers(reducers);
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
};

export default createStore;
