import epaymentSlice from './epayment.slice';
import popupSlice from './popup.slice';
import slice from './sapfin.slice';

export const { login, logout } = slice.actions;
export const { openPopup, closePopup } = popupSlice.actions;
export const { changeTypeFile, changeTab, updateSummary, updateMatching, updateExceptions, updateSearch } =
  epaymentSlice.actions;
