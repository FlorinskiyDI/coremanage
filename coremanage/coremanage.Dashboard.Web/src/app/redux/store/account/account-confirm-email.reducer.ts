import { IPayloadAction } from '../../util';
import { AccountActions, AccountActionTypes } from '../../actions/account.actions';
import { List, Map, Record } from 'immutable';

import { PageData } from '../../../common/index.models'

// model
export interface AccountConfirmEmailModel {
  userId: string;
  token: string;
  error: any,
  loading: boolean
};

// states
export interface AccountConfirmEmailState extends Map<string, any>, AccountConfirmEmailModel {
  set: (prop: string, val: any) => AccountConfirmEmailState;
  merge: (other: any) => AccountConfirmEmailState;
};

// record
export const AccountConfirmEmailRecord = Record({
  userId: null,
  token: null,
  error: null,
  loading: false
});

// init
export const INITIAL_STATE = new AccountConfirmEmailRecord(
    (<any>Object).assign(
      {},
      {
        userId: null,
        token: null,
        error: null,
        loading: false
      },
      {}
    )
  ) as AccountConfirmEmailState;


export function AccountConfirmEmailReducer(
  state: AccountConfirmEmailState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): AccountConfirmEmailState {
  switch (action.type) {

    case AccountActionTypes.POST_REQUEST_CONFIRM_EMAIL:
            return state.merge({
            userId: null,
            token: null,
            error: null,
            loading: true
        });

    case AccountActionTypes.POST_REQUEST_CONFIRM_EMAIL_SUCCESS:
        return state.merge({
            userId: action.payload.userId,
            token: action.payload.token,
            error: null,
            loading: false
        });

    case AccountActionTypes.POST_REQUEST_CONFIRM_EMAIL_FAILURE:
        return state.merge({
            userId: null,
            token: null,
            error: action.payload,
            loading: false
        });

    default:
        return state;
  }
}
