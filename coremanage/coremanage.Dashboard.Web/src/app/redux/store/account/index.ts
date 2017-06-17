import { combineReducers } from 'redux';

import { AccountConfirmEmailReducer, AccountConfirmEmailState } from './account-confirm-email.reducer';
import { AccountRegistrationReducer, AccountRegistrationState } from './account-registration.reducer';


export interface AccountState {
  accountConfirmEmail?: AccountConfirmEmailState,
  accountRegistration?: AccountRegistrationState,
};

// reducer
export const AccountReducer = combineReducers<AccountState>({
  accountConfirmEmail: AccountConfirmEmailReducer,
  accountRegistration: AccountRegistrationReducer,
});
