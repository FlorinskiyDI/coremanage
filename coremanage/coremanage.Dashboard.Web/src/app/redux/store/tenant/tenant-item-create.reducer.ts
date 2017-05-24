import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record } from 'immutable';

// model
export interface TenantItemCreateModel {
  getItem: any,
  postItem: any,
  error: any,
  loading: boolean
};

// states
export interface TenantItemCreateState extends Map<string, any>, TenantItemCreateModel {
  set: (prop: string, val: any) => TenantItemCreateState;
  merge: (other: any) => TenantItemCreateState;
};

// record
export const TenantItemCreateModalRecord = Record({
  getItem: null,
  postItem: null,
  error: null,
  loading: false
});

// init
export const INITIAL_STATE = new TenantItemCreateModalRecord(
    (<any>Object).assign(
      {},
      {
        getItem: null,
        postItem: null,
        error: null,
        loading: false
      },
      {}
    )
  ) as TenantItemCreateState;


export function TenantItemCreateReducer(
  state: TenantItemCreateState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): TenantItemCreateState {
  switch (action.type) {

    case TenantActionTypes.GET_REQUEST_TENANT_ITEM_CREATE:
        return state.merge({
            getItem: null,
            postItem: null,
            error: null,
            loading: true
        });

    case TenantActionTypes.GET_REQUEST_TENANT_ITEM_CREATE_SUCCESS:
        return state.merge({
            getItem: action.payload,
            error: null,
            loading: false
        });

    case TenantActionTypes.GET_REQUEST_TENANT_ITEM_CREATE_FAILURE:
        return state.merge({
            getItem: null,
            error: action.payload,
            loading: false
        });

    case TenantActionTypes.POST_REQUEST_TENANT_ITEM_CREATE:
        return state.merge({
            getItem: null,
            postItem: null,
            error: null,
            loading: true
        });

    case TenantActionTypes.POST_REQUEST_TENANT_ITEM_CREATE_SUCCESS:
        return state.merge({
            postItem: action.payload,
            error: null,
            loading: false
        });

    case TenantActionTypes.POST_REQUEST_TENANT_ITEM_CREATE_FAILURE:
        return state.merge({
            postItem: null,
            error: action.payload,
            loading: false
        });

    default:
        return state;

  }
}