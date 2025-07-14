/* eslint-disable no-duplicate-imports */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  open: boolean;
  title?: string;
  content?: React.ReactNode;
  onOk?: () => void;
}

const initialState: PopupState = {
  open: false,
  title: '',
  content: '',
  onOk: () => {},
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup(state, action: PayloadAction<{ title?: string; content?: React.ReactNode; onOk?: () => void }>) {
      state.open = true;
      state.title = action.payload.title || '';
      state.content = action.payload.content || '';
      state.onOk = action.payload.onOk;
    },
    closePopup(state) {
      state.open = false;
      state.title = '';
      state.content = '';
    },
  },
});

export default popupSlice;
