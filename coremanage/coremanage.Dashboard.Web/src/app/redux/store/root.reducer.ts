import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';

import * as fromSession from './session';
import * as fromTenant from './tenant';
import * as fromUser from './user';

export interface IAppState {
  session?: fromSession.ISession;
  tenant?: fromTenant.TenantState;
  user?: fromUser.UserState
};

export const rootReducer = combineReducers<IAppState>({
  router: routerReducer,
  session: fromSession.sessionReducer,
  tenant: fromTenant.tenantReducer,
  user: fromUser.userReducer
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