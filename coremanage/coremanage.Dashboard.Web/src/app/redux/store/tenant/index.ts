import { combineReducers } from 'redux';

import { TenantTreeReducer, TenantTreeState } from './tenant-tree.reducer';
// import { TenantItemCreateReducer, TenantItemCreateState } from './tenant-item-create.reducer';
// import { TenantItemUpdateReducer, TenantItemUpdateState } from './tenant-item-update.reducer';
import { TenantMemberReducer, TenantMemberState } from './tenant-member.reducer';
import { TenantItemReducer, TenantItemState } from './tenant-item.reducer';


export interface TenantState {
  tenantTree?: TenantTreeState,
  // tenantItemCreate?: TenantItemCreateState,
  // tenantItemUpdate?: TenantItemCreateState,
  tenantItem?: TenantItemState,
  tenantMember?: TenantMemberState
};

// reducer
export const tenantReducer = combineReducers<TenantState>({
  tenantTree: TenantTreeReducer,
  // tenantItemCreate: TenantItemCreateReducer,
  // tenantItemUpdate: TenantItemUpdateReducer,
  tenantItem: TenantItemReducer,
  tenantMember: TenantMemberReducer
});
