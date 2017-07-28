import { IPayloadAction, IBaseStateApi } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record } from 'immutable';

// model
export interface TenantItemDeleteModel extends IBaseStateApi<any, any> {  
  // id: any,
  // error: any,
  // loading: boolean
};

// states
export interface TenantItemDeleteState extends Map<string, any>, TenantItemDeleteModel {
  set: (prop: string, val: any) => TenantItemDeleteState;
  merge: (other: any) => TenantItemDeleteState;
};

// record
export const TenantItemDeleteModalRecord = Record({
  meta: null,
  data: null,
  isError: false,
  isLoading: false
});

// init
export const INITIAL_STATE = new TenantItemDeleteModalRecord(
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
  ) as TenantItemDeleteState;


export function TenantItemDeleteReducer(
  state: TenantItemDeleteState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): TenantItemDeleteState {
  switch (action.type) {

    case TenantActionTypes.DELETE_TENANT_ITEM:
        return state.merge({
            meta: action.meta,
            data: null,
            isError: false,
            isLoading: true
        } as TenantItemDeleteModel );

    case TenantActionTypes.DELETE_TENANT_ITEM_SUCCESS:
        return state.merge({
            meta: null,
            data: action.payload,
            isError: false,
            isLoading: false
        } as TenantItemDeleteModel );       

    case TenantActionTypes.DELETE_TENANT_ITEM_FAILURE:
        return state.merge({
            meta: null,
            data: null,
            isError: action.payload,
            isLoading: false
        } as TenantItemDeleteModel );

    default:
        return INITIAL_STATE;

  }
}