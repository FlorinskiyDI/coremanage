import { IPayloadAction, IBaseStateApi } from '../../util';
import { UserActions, UserActionTypes } from '../../actions/user.actions';
import { List, Map, Record } from 'immutable';

import { PageData } from '../../../common/index.models'

// model
export interface UserGridModel {
  items: Array<any>;
  totalItemCount: number;
  pageNumber: number;
};

// states
export interface UserGridState extends Map<string, any>, IBaseStateApi<UserGridModel, any> {
  set: (prop: string, val: any) => UserGridState;
  merge: (other: any) => UserGridState;
};

// record
export const UserGridModalRecord = Record({
    meta: null,
    data: null,
    error: null,
    isError: false,
    isLoading: false
});

// init
export const INITIAL_STATE = new UserGridModalRecord(
    (<any>Object).assign(
      {},
      {
        meta: null,
        data: null,
        error: null,
        isError: false,
        isLoading: false
      },
      {}
    )
  ) as UserGridState;


export function UserGridReducer(
  state: UserGridState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): UserGridState {
  switch (action.type) {

    case UserActionTypes.GET_REQUEST_USER_GRID:
        const pageNumber = action.meta.pageNumber;
        return state.merge({
            meta: null,
            data: null,
            error: null,
            isError: false,
            isLoading: false
        } as UserGridState);

    case UserActionTypes.GET_REQUEST_USER_GRID_SUCCESS:
        return state.merge({                
            data: action.payload,
            error: null,
            isError: false,
            isLoading: false
        } as UserGridState);

    case UserActionTypes.GET_REQUEST_USER_GRID_FAILURE:
        return state.merge({
            data: null,
            error: action.payload,
            isError: true,
            isLoading: false
        } as UserGridState);

    default:
        return INITIAL_STATE;

  }
}
