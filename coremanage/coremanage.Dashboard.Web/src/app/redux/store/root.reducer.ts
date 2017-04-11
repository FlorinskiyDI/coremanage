import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';
import * as session from './session';
import { IAppState } from './root.types';


export const rootReducer = combineReducers<IAppState>({
  router: routerReducer,
  session: session.sessionReducer
});