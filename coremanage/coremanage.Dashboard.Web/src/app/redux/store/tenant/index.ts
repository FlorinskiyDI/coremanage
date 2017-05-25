import { combineReducers } from 'redux';

import { TenantTreeReducer, TenantTreeState } from './tenant-tree.reducer';
import { TenantItemCreateReducer, TenantItemCreateState } from './tenant-item-create.reducer';
import { TenantItemUpdateReducer, TenantItemUpdateState } from './tenant-item-update.reducer';


export interface TenantState {
  tenantTree?: TenantTreeState,
  tenantItemCreate?: TenantItemCreateState,
  tenantItemUpdate?: TenantItemCreateState
};

// reducer
export const tenantReducer = combineReducers<TenantState>({
  tenantTree: TenantTreeReducer,
  tenantItemCreate: TenantItemCreateReducer,
  tenantItemUpdate: TenantItemUpdateReducer
});
