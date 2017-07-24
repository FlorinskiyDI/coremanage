import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record } from 'immutable';

// model
export interface TenantItemDeleteModel {  
  id: any,
  error: any,
  loading: boolean
};

// states
export interface TenantItemDeleteState extends Map<string, any>, TenantItemDeleteModel {
  set: (prop: string, val: any) => TenantItemDeleteState;
  merge: (other: any) => TenantItemDeleteState;
};

// record
export const TenantItemDeleteModalRecord = Record({
  id: null,
  error: null,
  loading: false
});

// init
export const INITIAL_STATE = new TenantItemDeleteModalRecord(
    (<any>Object).assign(
      {},
      {
        id: null,
        error: null,
        loading: false
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
            id: null,
            error: null,
            loading: true
        });

    case TenantActionTypes.DELETE_TENANT_ITEM_SUCCESS:
        return state.merge({
            id: action.payload,
            error: null,
            loading: false
        });

    case TenantActionTypes.DELETE_TENANT_ITEM_FAILURE:
        return state.merge({
            id: null,
            error: action.payload,
            loading: false
        });


    default:
        return state;

  }
}