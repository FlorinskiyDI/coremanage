import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';

import * as fromSession from './session';
import * as fromTenant from './tenant';
import * as fromLayout from './layout';
import * as fromUser from './user';
import * as fromAccount from './account';

export interface IAppState {
  session?: fromSession.ISession,
  tenant?: fromTenant.TenantState,
  user?: fromUser.UserState
  layout?: fromLayout.LayoutState,
  account?: fromAccount.AccountState
};

export const rootReducer = combineReducers<IAppState>({
  router: routerReducer,
  layout: fromLayout.layoutReducer,
  session: fromSession.sessionReducer,
  tenant: fromTenant.tenantReducer, 
  account: fromAccount.AccountReducer,
  user: fromUser.userReducer,
});

// export function deimmutify(store: any) {
//   return {
//     session: session.deimmutifySession(store.session),
//   };
// }

// export function reimmutify(plain: any) {
//   return {
//     session: session.reimmutifySession(plain.session),
//   };
// }