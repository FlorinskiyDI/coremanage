import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record } from 'immutable';

// model
export interface TenantItemModel {
  item: any,
  error: any,
  loading: boolean
};

// states
export interface TenantItemState extends Map<string, any>, TenantItemModel {
  set: (prop: string, val: any) => TenantItemState;
  merge: (other: any) => TenantItemState;
};

// record
export const TenantItemModalRecord = Record({
  item: null,
  error: null,
  loading: false
});

// init
export const INITIAL_STATE = new TenantItemModalRecord(
    (<any>Object).assign(
      {},
      {
        item: null,
        error: null,
        loading: false
      },
      {}
    )
  ) as TenantItemState;


export function TenantItemReducer(
  state: TenantItemState = INITIAL_STATE,
  action: IPayloadAction<any>
): TenantItemState {
  switch (action.type) {

    case TenantActionTypes.LOAD_TENANT_ITEM:
        return state.merge({
            item: null,
            error: null,
            loading: true
        });    

    case TenantActionTypes.LOAD_TENANT_ITEM_SUCCESS:
        return state.merge({
            item: action.payload,
            error: null,
            loading: false
        });

    case TenantActionTypes.LOAD_TENANT_ITEM_FAILURE:
        return state.merge({
            item: null,
            error: action.payload,
            loading: false
        });

    default:
        return state;

  }
}