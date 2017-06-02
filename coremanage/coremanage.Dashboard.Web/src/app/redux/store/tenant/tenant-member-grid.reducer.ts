import { IPayloadAction } from '../../util';
import { TenantActions, TenantActionTypes } from '../../actions/tenant.actions';
import { List, Map, Record } from 'immutable';

import { PageData } from '../../../common/index.models'

// model
export interface TenantMemberGridModel {  
  items: Array<any>;
  totalItems: number;
  pageNumber: number;
  error: any,
  loading: boolean
};

// states
export interface TenantMemberGridState extends Map<string, any>, TenantMemberGridModel {
  set: (prop: string, val: any) => TenantMemberGridState;
  merge: (other: any) => TenantMemberGridState;
};

// record
export const TenantMemberGridModalRecord = Record({
  items: List(),
  totalItems: 0,
  pageNumber: 1,
  error: null,
  loading: false
});

// init
export const INITIAL_STATE = new TenantMemberGridModalRecord(
    (<any>Object).assign(
      {},
      {
        items: List(),
        totalItems: 0,
        pageNumber: 1,
        error: null,
        loading: false
      },
      {}
    )
  ) as TenantMemberGridState;


export function TenantMemberGridReducer(
  state: TenantMemberGridState = INITIAL_STATE,
  action: IPayloadAction<PageData<any>, any>
): TenantMemberGridState {
  switch (action.type) {

    case TenantActionTypes.GET_REQUEST_TENANT_MEMBER_GRID:
        const pageNumber = action.meta;
        return state.merge({
            items: List(),
            pageNumber: pageNumber == null ? state.pageNumber : pageNumber,
            error: null,
            loading: true
        });

    case TenantActionTypes.GET_REQUEST_TENANT_MEMBER_GRID_SUCCESS:
        return state.merge({
            items: List(action.payload.items),
            totalItems: action.payload.totalItems,            
            pageNumber: action.payload.pageNumber,         
            error: null,
            loading: false
        });

    case TenantActionTypes.GET_REQUEST_TENANT_MEMBER_GRID_FAILURE:
        return state.merge({
            items: List(),
            totalItems: 0,
            error: action.payload,
            loading: false
        });

    default:
        return state;

  }
}


export const getItems = (state:TenantMemberGridState) => state.items;