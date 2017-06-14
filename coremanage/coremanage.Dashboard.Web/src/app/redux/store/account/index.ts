import { combineReducers } from 'redux';

import { AccountConfirmEmailReducer, AccountConfirmEmailState } from './account-confirm-email.reducer';


export interface AccountState {
  accountConfirmEmail?: AccountConfirmEmailState,
};

// reducer
export const AccountReducer = combineReducers<AccountState>({
  accountConfirmEmail: AccountConfirmEmailReducer,
});
