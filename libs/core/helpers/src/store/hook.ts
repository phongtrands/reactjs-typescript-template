import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import type { AppDispatch, RootState } from './type.js';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
