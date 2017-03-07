import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';
import * as session from './session';

export interface IAppState {
  session?: session.ISession;
};

export const rootReducer = combineReducers<IAppState>({
  router: routerReducer,
  session: session.sessionReducer
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
