import { IPayloadAction, IBaseStateApi } from '../../util';
import { UserActions, UserActionTypes } from '../../actions/user.actions';
import { List, Map, Record } from 'immutable';

// states
export interface UserItemDeleteState extends Map<string, any>, IBaseStateApi<any, any> {
  set: (prop: string, val: any) => UserItemDeleteState;
  merge: (other: any) => UserItemDeleteState;
};

// record
export const UserItemDeleteModalRecord = Record({
  meta: null,
  data: null,
  isError: false,
  isLoading: false
});

// init
export const INITIAL_STATE = new UserItemDeleteModalRecord(
    (<any>Object).assign(
      {},
      {
        meta: null,
        data: null,
        isError: false,
        isLoading: false
      },
      {}
    )
  ) as UserItemDeleteState;


export function UserItemDeleteReducer(
  state: UserItemDeleteState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): UserItemDeleteState {
  switch (action.type) {

    case UserActionTypes.DELETE_USER_ITEM:
        return state.merge({
            meta: action.meta,
            data: null,
            isError: false,
            isLoading: true
        } as UserItemDeleteState );

    case UserActionTypes.DELETE_USER_ITEM_SUCCESS:
        return state.merge({
            meta: null,
            data: action.payload,
            isError: false,
            isLoading: false
        } as UserItemDeleteState );       

    case UserActionTypes.DELETE_USER_ITEM_FAILURE:
        return state.merge({
            meta: null,
            data: action.payload,
            isError: true,
            isLoading: false
        } as UserItemDeleteState );

    default:
        return INITIAL_STATE;

  }
}