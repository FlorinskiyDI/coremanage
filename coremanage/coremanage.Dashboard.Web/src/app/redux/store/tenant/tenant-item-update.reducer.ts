import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record } from 'immutable';

// model
export interface TenantItemUpdateModel {
  getItem: any,
  postItem: any,
  error: any,
  loading: boolean
};

// states
export interface TenantItemUpdateState extends Map<string, any>, TenantItemUpdateModel {
  set: (prop: string, val: any) => TenantItemUpdateState;
  merge: (other: any) => TenantItemUpdateState;
};

// record
export const TenantItemUpdateModalRecord = Record({
  getItem: null,
  postItem: null,
  loading: false,
  error: null
});

// init
export const INITIAL_STATE = new TenantItemUpdateModalRecord(
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
  ) as TenantItemUpdateState;


export function TenantItemUpdateReducer(
  state: TenantItemUpdateState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): TenantItemUpdateState {
  switch (action.type) {

    case TenantActionTypes.GET_REQUEST_TENANT_ITEM_UPDATE:
        return state.merge({
            getItem: null,
            error: null,
            loading: true
        });

    case TenantActionTypes.GET_REQUEST_TENANT_ITEM_UPDATE_SUCCESS:
        return state.merge({
            getItem: action.payload,
            error: null,
            loading: false
        });

    case TenantActionTypes.GET_REQUEST_TENANT_ITEM_UPDATE_FAILURE:
        return state.merge({
            getItem: null,
            error: action.payload,
            loading: false
        });


    case TenantActionTypes.POST_REQUEST_TENANT_ITEM_UPDATE:
        return state.merge({
            postItem: null,
            error: null,
            loading: true
        });    

    case TenantActionTypes.POST_REQUEST_TENANT_ITEM_UPDATE_SUCCESS:
        return state.merge({
            postItem: action.payload,
            error: null,
            loading: false
        });

    case TenantActionTypes.POST_REQUEST_TENANT_ITEM_UPDATE_FAILURE:
        return state.merge({
            postItem: null,
            error: action.payload,
            loading: false
        });

    default:
        return state;

  }
}