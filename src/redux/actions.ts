import popupSlice from './popupSlice';
import slice from './sapfinSlice';

export const { login, logout } = slice.actions;
export const { openPopup, closePopup } = popupSlice.actions;
