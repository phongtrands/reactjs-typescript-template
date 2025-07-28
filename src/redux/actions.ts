import epaymentSlice from './epayment.slice';
import popupSlice from './popup.slice';
import authSlice from './auth.slice';

export const { login, logout } = authSlice.actions;
export const { openPopup, closePopup } = popupSlice.actions;
export const {
  changeTypeFile,
  changeSelectedFile,
  changeTab,
  updateSummary,
  updateMatching,
  updateExceptions,
  updateSearch,
} = epaymentSlice.actions;
