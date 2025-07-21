/* eslint-disable no-duplicate-imports */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  open: boolean;
  type: string;
  title?: string;
  content?: React.ReactNode;
  onOk?: () => void;
}

const initialState: PopupState = {
  open: false,
  type: '',
  title: '',
  content: '',
  onOk: () => {},
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup(
      state,
      action: PayloadAction<{ type?: string; title?: string; content?: React.ReactNode; onOk?: () => void }>,
    ) {
      state.open = true;
      state.type = action.payload.type || '';
      state.title = action.payload.title || '';
      state.content = action.payload.content || '';
      state.onOk = action.payload.onOk;
    },
    closePopup(state) {
      state.open = false;
      state.type = '';
      state.title = '';
      state.content = '';
    },
  },
});

export default popupSlice;
