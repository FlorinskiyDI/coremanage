import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record } from 'immutable';

// model
export interface TenantCreateItemModel {
  item: any,
  error: any,
  loading: boolean
};

// states
export interface TenantCreateItemState extends Map<string, any>, TenantCreateItemModel {
  set: (prop: string, val: any) => TenantCreateItemState;
  merge: (other: any) => TenantCreateItemState;
};

// record
export const TenantCreateItemModalRecord = Record({
  item: null,
  error: null,
  loading: false
});

// init
export const INITIAL_STATE = new TenantCreateItemModalRecord(
    (<any>Object).assign(
      {},
      {
        item: null,
        error: null,
        loading: false
      },
      {}
    )
  ) as TenantCreateItemState;


export function TenantCreateItemReducer(
  state: TenantCreateItemState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): TenantCreateItemState {
  switch (action.type) {

    case TenantActionTypes.GET_REQUEST_TENANT_CREATE_ITEM:
        return state.merge({
            item: null,
            error: null,
            loading: true
        });    

    case TenantActionTypes.REQUEST_TENANT_CREATE_ITEM_SUCCESS:
        return state.merge({
            item: action.payload,
            error: null,
            loading: false
        });

    case TenantActionTypes.REQUEST_TENANT_CREATE_ITEM_FAILURE:
        return state.merge({
            item: null,
            error: action.payload,
            loading: false
        });

    default:
        return state;

  }
}