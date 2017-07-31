import { IPayloadAction, IBaseStateApi } from '../../util';
import { UserActions, UserActionTypes } from '../../actions/user.actions';
import { List, Map, Record } from 'immutable';

// model
export interface UserItemCreateModel {
  getItem: any,
  postItem: any
};

// states
export interface UserItemCreateState extends Map<string, any>, IBaseStateApi<UserItemCreateModel, any> {
  set: (prop: string, val: any) => UserItemCreateState;
  merge: (other: any) => UserItemCreateState;
};

// record
export const UserItemCreateModalRecord = Record({
    meta: null,
    data: Map(),
    error: Map(),
    isError: false,
    isLoading: false
});

// init
export const INITIAL_STATE = new UserItemCreateModalRecord(
    (<any>Object).assign(
      {},
      {
        meta: null,
        data: Map(),
        error: Map(),
        isError: false,
        isLoading: false
      },
      {}
    )
  ) as UserItemCreateState;


export function UserItemCreateReducer(
  state: UserItemCreateState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): UserItemCreateState {
  switch (action.type) {

    case UserActionTypes.GET_REQUEST_USER_ITEM_CREATE:
        return state.merge({
            meta: null,
            data: null,
            error: null,
            isError: false,
            isLoading: false
        } as IBaseStateApi<UserItemCreateModel, any>);
        
    case UserActionTypes.GET_REQUEST_USER_ITEM_CREATE_SUCCESS:
        return state.merge({
            data: {
                getItem: action.payload,
                postItem: null
            },
            isError: false,
            isLoading: false
        } as IBaseStateApi<UserItemCreateModel, any>);

    case UserActionTypes.GET_REQUEST_USER_ITEM_CREATE_FAILURE:
        return state.merge({
            data: null,
            error: action.payload,
            isError: true,
            isLoading: false
        } as IBaseStateApi<UserItemCreateModel, any>);


    case UserActionTypes.POST_REQUEST_USER_ITEM_CREATE:
        return state.merge({
            meta: null,
            data: null,
            error: null,
            isError: false,
            isLoading: false
        }as IBaseStateApi<UserItemCreateModel, any>);

    case UserActionTypes.POST_REQUEST_USER_ITEM_CREATE_SUCCESS:
        return state.merge({
            data: {
                getItem: null,
                postItem: action.payload
            },
            isError: false,
            isLoading: false
        } as IBaseStateApi<UserItemCreateModel, any>);

    case UserActionTypes.POST_REQUEST_USER_ITEM_CREATE_FAILURE:
        return state.merge({
            data: null,
            error: action.payload,
            isError: true,
            isLoading: false
        } as IBaseStateApi<UserItemCreateModel, any>);

    default:
        return INITIAL_STATE;

  }
}