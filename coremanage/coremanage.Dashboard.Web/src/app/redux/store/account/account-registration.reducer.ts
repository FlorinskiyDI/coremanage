import { IPayloadAction } from '../../util';
import { AccountActions, AccountActionTypes } from '../../actions/account.actions';
import { List, Map, Record } from 'immutable';

import { PageData } from '../../../common/index.models'

// model
export interface AccountRegistrationModel {
  data: string;
  error: any,
  loading: boolean
};

// states
export interface AccountRegistrationState extends Map<string, any>, AccountRegistrationModel {
  set: (prop: string, val: any) => AccountRegistrationState;
  merge: (other: any) => AccountRegistrationState;
};

// record
export const AccountRegistrationRecord = Record({
  data: null,
  error: null,
  loading: false
});

// init
export const INITIAL_STATE = new AccountRegistrationRecord(
    (<any>Object).assign(
      {},
      {
        data: null,
        error: null,
        loading: false
      },
      {}
    )
  ) as AccountRegistrationState;


export function AccountRegistrationReducer(
  state: AccountRegistrationState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): AccountRegistrationState {
  switch (action.type) {

    case AccountActionTypes.POST_REQUEST_CONFIRM_EMAIL:
        return state.merge({
            data: null,
            error: null,
            loading: true
        });

    case AccountActionTypes.POST_REQUEST_CONFIRM_EMAIL_SUCCESS:
        return state.merge({
            data: action.payload,
            error: null,
            loading: false
        });

    case AccountActionTypes.POST_REQUEST_CONFIRM_EMAIL_FAILURE:
        return state.merge({
            data: null,
            error: action.payload,
            loading: false
        });

    default:
        return state;
  }
}
