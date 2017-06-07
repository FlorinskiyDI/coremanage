import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record } from 'immutable';

// model
export interface TenantMemberCreateModel {
  getMember: any,
  postMember: any,
  error: any,
  loading: boolean
};

// states
export interface TenantMemberCreateState extends Map<string, any>, TenantMemberCreateModel {
  set: (prop: string, val: any) => TenantMemberCreateState;
  merge: (other: any) => TenantMemberCreateState;
};

// record
export const TenantMemberCreateModalRecord = Record({
  getMember: null,
  postMember: null,
  error: null,
  loading: false
});

// init
export const INITIAL_STATE = new TenantMemberCreateModalRecord(
    (<any>Object).assign(
      {},
      {
        getMember: null,
        postMember: null,
        error: null,
        loading: false
      },
      {}
    )
  ) as TenantMemberCreateState;


export function TenantMemberCreateReducer(
  state: TenantMemberCreateState = INITIAL_STATE,
  action: IPayloadAction<any, any>
): TenantMemberCreateState {
  switch (action.type) {

    case TenantActionTypes.GET_REQUEST_TENANT_MEMBER_CREATE:
        return state.merge({
            getMember: null,
            postMember: null,
            error: null,
            loading: true
        });

    case TenantActionTypes.GET_REQUEST_TENANT_MEMBER_CREATE_SUCCESS:
        return state.merge({
            getMember: action.payload,
            error: null,
            loading: false
        });

    case TenantActionTypes.GET_REQUEST_TENANT_MEMBER_CREATE_FAILURE:
        return state.merge({
            getMember: null,
            error: action.payload,
            loading: false
        });

    case TenantActionTypes.POST_REQUEST_TENANT_MEMBER_CREATE:
        return state.merge({
            getMember: null,
            postMember: null,
            error: null,
            loading: true
        });

    case TenantActionTypes.POST_REQUEST_TENANT_MEMBER_CREATE_SUCCESS:
        return state.merge({
            postMember: action.payload,
            error: null,
            loading: false
        });

    case TenantActionTypes.POST_REQUEST_TENANT_MEMBER_CREATE_FAILURE:
        return state.merge({
            postMember: null,
            error: action.payload,
            loading: false
        });

    default:
        return state;

  }
}