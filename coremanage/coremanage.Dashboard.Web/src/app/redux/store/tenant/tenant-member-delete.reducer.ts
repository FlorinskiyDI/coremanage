import { IPayloadAction, IBaseStateApi } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record } from 'immutable';

// model
export interface TenantMemberDeleteModel extends IBaseStateApi<any, any> {  
  // id: any,
  // error: any,
  // loading: boolean
};

// states
export interface TenantMemberDeleteState extends Map<string, any>, TenantMemberDeleteModel {
  set: (prop: string, val: any) => TenantMemberDeleteState;
  merge: (other: any) => TenantMemberDeleteState;
};

// record
export const TenantMemberDeleteModalRecord = Record({
  meta: null,
  data: null,
  isError: false,
  isLoading: false
});

// init
export const INITIAL_STATE = new TenantMemberDeleteModalRecord(
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
  ) as TenantMemberDeleteState;


export function TenantMemberDeleteReducer(
  state: TenantMemberDeleteState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): TenantMemberDeleteState {
  switch (action.type) {

    case TenantActionTypes.DELETE_TENANT_MEMBER:
        return state.merge({
            meta: action.meta,
            data: null,
            isError: false,
            isLoading: true
        } as TenantMemberDeleteModel );

    case TenantActionTypes.DELETE_TENANT_MEMBER_SUCCESS:
        return state.merge({
            meta: null,
            data: action.payload,
            isError: false,
            isLoading: false
        } as TenantMemberDeleteModel );       

    case TenantActionTypes.DELETE_TENANT_MEMBER_FAILURE:
        return state.merge({
            meta: null,
            data: null,
            isError: action.payload,
            isLoading: false
        } as TenantMemberDeleteModel );

    default:
        return INITIAL_STATE;

  }
}