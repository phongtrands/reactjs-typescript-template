import createStore from './store.js';

type RootState = ReturnType<typeof createStore> extends { getState: () => infer R } ? R : never;
type AppDispatch = ReturnType<typeof createStore> extends { dispatch: infer D } ? D : never;

export type { RootState, AppDispatch };