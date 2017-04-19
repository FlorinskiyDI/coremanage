import { Action } from 'redux';
import { SessionActions } from './session.actions';
import { TenantActions } from './tenant.actions';

export interface IPayloadAction<T> extends Action {
  payload?: T;
}
export const ACTION_PROVIDERS: any[] = [
    SessionActions,
    TenantActions
];

