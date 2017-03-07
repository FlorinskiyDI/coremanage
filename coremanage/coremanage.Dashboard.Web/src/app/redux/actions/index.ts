import { Action } from 'redux';
import { SessionActions } from './session.actions';

export interface IPayloadAction<T> extends Action {
  payload?: T;
}
export const ACTION_PROVIDERS: any[] = [
    SessionActions
];

