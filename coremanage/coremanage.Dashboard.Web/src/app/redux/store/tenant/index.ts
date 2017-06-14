import { combineReducers } from 'redux';

import { TenantTreeReducer, TenantTreeState } from './tenant-tree.reducer';
import { TenantMemberReducer, TenantMemberState } from './tenant-member.reducer';
import { TenantItemReducer, TenantItemState } from './tenant-item.reducer';


export interface TenantState {
  tenantTree?: TenantTreeState,
  tenantItem?: TenantItemState,
  tenantMember?: TenantMemberState
};

// reducer
export const tenantReducer = combineReducers<TenantState>({
  tenantTree: TenantTreeReducer,
  tenantItem: TenantItemReducer,
  tenantMember: TenantMemberReducer
});
