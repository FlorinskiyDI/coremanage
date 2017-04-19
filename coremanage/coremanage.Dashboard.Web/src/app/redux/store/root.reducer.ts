import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';
import * as session from './session';
import * as tenant from './tenant';
import { IAppState } from './';


export const rootReducer = combineReducers<IAppState>({
  router: routerReducer,
  session: session.sessionReducer,
  tenant: tenant.tenantReducer
});

export function deimmutify(store: any) {
  return {
    session: session.deimmutifySession(store.session),
  };
}

export function reimmutify(plain: any) {
  return {
    session: session.reimmutifySession(plain.session),
  };
}