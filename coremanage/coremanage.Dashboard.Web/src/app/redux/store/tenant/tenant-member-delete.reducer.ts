import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record } from 'immutable';

// model
export interface TenantMemberDeleteModel {  
  id: any,
  error: any,
  loading: boolean
};

// states
export interface TenantMemberDeleteState extends Map<string, any>, TenantMemberDeleteModel {
  set: (prop: string, val: any) => TenantMemberDeleteState;
  merge: (other: any) => TenantMemberDeleteState;
};

// record
export const TenantMemberDeleteModalRecord = Record({
  id: null,
  error: null,
  loading: false
});

// init
export const INITIAL_STATE = new TenantMemberDeleteModalRecord(
    (<any>Object).assign(
      {},
      {
        id: null,
        error: null,
        loading: false
      },
      {}
    )
  ) as TenantMemberDeleteState;


export function TenantMemberDeleteReducer(
  state: TenantMemberDeleteState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): TenantMemberDeleteState {
  switch (action.type) {

    case TenantActionTypes.DELETE_TENANT_MEMBER:
        return state.merge({
            id: null,
            error: null,
            loading: true
        });

    case TenantActionTypes.DELETE_TENANT_MEMBER_SUCCESS:
        return state.merge({
            id: action.payload,
            error: null,
            loading: false
        });

    case TenantActionTypes.DELETE_TENANT_MEMBER_FAILURE:
        return state.merge({
            id: null,
            error: action.payload,
            loading: false
        });


    default:
        return state;

  }
}